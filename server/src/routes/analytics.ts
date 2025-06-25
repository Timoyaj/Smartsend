import express from 'express';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', authenticate, async (req: AuthenticatedRequest, res) => {
  try {
    const organizationId = req.user!.organizationId;

    // Get basic counts
    const [
      totalContacts,
      totalCampaigns,
      totalTemplates,
      recentCampaigns,
    ] = await Promise.all([
      prisma.contact.count({
        where: { organizationId },
      }),
      prisma.campaign.count({
        where: { organizationId },
      }),
      prisma.template.count({
        where: { organizationId },
      }),
      prisma.campaign.findMany({
        where: { organizationId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          type: true,
          status: true,
          createdAt: true,
          analytics: {
            select: {
              totalSent: true,
              delivered: true,
              opened: true,
            },
          },
        },
      }),
    ]);

    // Calculate total messages sent
    const totalMessagesSent = await prisma.campaignAnalytics.aggregate({
      where: {
        campaign: {
          organizationId,
        },
      },
      _sum: {
        totalSent: true,
        delivered: true,
        opened: true,
        clicked: true,
      },
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalContacts,
          totalCampaigns,
          totalTemplates,
          totalMessagesSent: totalMessagesSent._sum.totalSent || 0,
          deliveryRate: totalMessagesSent._sum.totalSent 
            ? ((totalMessagesSent._sum.delivered || 0) / totalMessagesSent._sum.totalSent * 100).toFixed(1)
            : '0.0',
          openRate: totalMessagesSent._sum.delivered
            ? ((totalMessagesSent._sum.opened || 0) / totalMessagesSent._sum.delivered * 100).toFixed(1)
            : '0.0',
        },
        recentCampaigns,
      },
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;