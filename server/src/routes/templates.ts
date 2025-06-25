import express from 'express';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Get all templates for organization
router.get('/', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const { type } = req.query;

    const where = {
      organizationId: req.user!.organizationId,
      ...(type && { type: type as string }),
    };

    const templates = await prisma.template.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        type: true,
        subject: true,
        content: true,
        category: true,
        tags: true,
        usageCount: true,
        isDefault: true,
        createdAt: true,
        creator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: { templates },
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;