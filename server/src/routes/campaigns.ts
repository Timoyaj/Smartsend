import express from 'express';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Get all campaigns for organization
router.get('/', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      organizationId: req.user!.organizationId,
      ...(type && { type: type as string }),
    };

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          type: true,
          subject: true,
          status: true,
          scheduledAt: true,
          sentAt: true,
          createdAt: true,
          creator: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          analytics: {
            select: {
              totalSent: true,
              delivered: true,
              opened: true,
              clicked: true,
            },
          },
        },
      }),
      prisma.campaign.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        campaigns,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;