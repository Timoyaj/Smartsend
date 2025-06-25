import prisma from './lib/prisma';
import { hashPassword } from './lib/auth';

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Create demo organization
    const organization = await prisma.organization.create({
      data: {
        name: 'Demo Organization',
        planType: 'PROFESSIONAL',
        creditsRemaining: {
          sms: 5000,
          email: 25000,
        },
        settings: {
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          notifications: {
            email: true,
            sms: true,
          },
        },
      },
    });

    // Create demo admin user
    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@demo.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        organizationId: organization.id,
      },
    });

    // Create demo manager user
    const managerUser = await prisma.user.create({
      data: {
        email: 'manager@demo.com',
        passwordHash: await hashPassword('password123'),
        firstName: 'Manager',
        lastName: 'User',
        role: 'MANAGER',
        organizationId: organization.id,
      },
    });

    // Create demo contacts
    const contacts = await Promise.all([
      prisma.contact.create({
        data: {
          organizationId: organization.id,
          email: 'john.doe@example.com',
          phone: '+1234567890',
          firstName: 'John',
          lastName: 'Doe',
          customFields: {
            company: 'Tech Corp',
            position: 'Developer',
          },
          tags: ['customer', 'tech'],
          status: 'ACTIVE',
        },
      }),
      prisma.contact.create({
        data: {
          organizationId: organization.id,
          email: 'jane.smith@example.com',
          phone: '+1234567891',
          firstName: 'Jane',
          lastName: 'Smith',
          customFields: {
            company: 'Design Studio',
            position: 'Designer',
          },
          tags: ['prospect', 'design'],
          status: 'ACTIVE',
        },
      }),
    ]);

    // Create demo contact list
    const contactList = await prisma.contactList.create({
      data: {
        organizationId: organization.id,
        name: 'Newsletter Subscribers',
        description: 'Users subscribed to our newsletter',
      },
    });

    // Add contacts to list
    await Promise.all(
      contacts.map(contact =>
        prisma.contactListMember.create({
          data: {
            contactId: contact.id,
            listId: contactList.id,
          },
        })
      )
    );

    // Create demo templates
    await Promise.all([
      prisma.template.create({
        data: {
          organizationId: organization.id,
          type: 'EMAIL',
          name: 'Welcome Email',
          subject: 'Welcome to {{organizationName}}!',
          content: `
            <h1>Welcome {{firstName}}!</h1>
            <p>Thank you for joining {{organizationName}}. We're excited to have you on board!</p>
            <p>Best regards,<br>The {{organizationName}} Team</p>
          `,
          variables: ['firstName', 'organizationName'],
          category: 'Welcome',
          tags: ['welcome', 'onboarding'],
          createdBy: adminUser.id,
          isDefault: true,
        },
      }),
      prisma.template.create({
        data: {
          organizationId: organization.id,
          type: 'SMS',
          name: 'Appointment Reminder',
          content: 'Hi {{firstName}}, this is a reminder about your appointment on {{date}} at {{time}}. Reply STOP to opt out.',
          variables: ['firstName', 'date', 'time'],
          category: 'Reminder',
          tags: ['appointment', 'reminder'],
          createdBy: adminUser.id,
          isDefault: true,
        },
      }),
    ]);

    // Create demo campaign
    const campaign = await prisma.campaign.create({
      data: {
        organizationId: organization.id,
        type: 'EMAIL',
        name: 'Monthly Newsletter',
        subject: 'Your Monthly Update',
        content: 'Check out our latest updates and news!',
        status: 'SENT',
        sentAt: new Date(),
        createdBy: adminUser.id,
      },
    });

    // Create campaign analytics
    await prisma.campaignAnalytics.create({
      data: {
        campaignId: campaign.id,
        totalSent: 150,
        delivered: 148,
        opened: 89,
        clicked: 23,
        bounced: 2,
        unsubscribed: 1,
      },
    });

    console.log('✅ Database seeded successfully!');
    console.log('📧 Demo admin: admin@demo.com / password123');
    console.log('👤 Demo manager: manager@demo.com / password123');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });