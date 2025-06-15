import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  let mcdonalds = await prisma.store.findUnique({
    where: {
      id: 'macdonalds',
    },
  });

  if (!mcdonalds) {
    mcdonalds = await prisma.store.create({
      data: {
        id: 'macdonalds',
        name: 'MacDonalds',
        description: 'MacDonalds is a fast food restaurant',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png',
        bannerUrl:
          'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nfl_sharing_logos/mc_donalds_logo_png_4c_black.png?$mcd_sharing_logo$',
        websiteUrl: 'https://www.mcdonalds.com',
      },
    });
  }

  let aromakava = await prisma.store.findUnique({
    where: {
      id: 'aromakava',
    },
  });

  if (!aromakava) {
    aromakava = await prisma.store.create({
      data: {
        id: 'aromakava',
        name: 'Aroma Kava',
        description: 'Aroma Kava is a coffee shop',
        logoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMwVlmC6xqaNhQC4VzGYvOR97UUJ_JkqwVbA&s',
        bannerUrl:
          'https://sloviansk.mixfood.ua/upload/catalog_categories/images/s__ekrana_2024-12-09_v_23.25.021733779602.png',
        websiteUrl: 'https://www.aromakava.ua',
      },
    });
  }

  let lvivcroissants = await prisma.store.findUnique({
    where: {
      id: 'lvivcruasants',
    },
  });

  if (!lvivcroissants) {
    lvivcroissants = await prisma.store.create({
      data: {
        id: 'lvivcruasants',
        name: 'Lviv Croissants',
        description: 'Lviv Croissants is a bakery',
        logoUrl: 'https://bond.delivery/eda/images/logo/985_1599300689.png',
        bannerUrl:
          'https://lvivcroissants.com/us/wp-content/uploads/sites/4/2024/07/logo-sk-lviv-croissants.png',
        websiteUrl: 'https://lvivcroissants.com/ua/',
        theme: 'black',
      },
    });
  }

  let ethkyiv = await prisma.store.findUnique({
    where: {
      id: 'ethkyiv',
    },
  });

  if (!ethkyiv) {
    ethkyiv = await prisma.store.create({
      data: {
        id: 'ethkyiv',
        name: 'ETHKyiv',
        description:
          'ETHKyiv is a hackathon that takes place in Kyiv, Ukraine. It is a great place to learn about blockchain and web3.',
        logoUrl:
          'https://ethkyiv.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F166176a965ef4207be7d83a37fe59159%2Fassets%2Ffavicon%2F817.jpeg&w=1440&q=75',
        bannerUrl:
          'https://incrypted.com/wp-content/uploads/2024/12/ethkyiv.jpg',
        websiteUrl: 'https://ethkyiv.com/',
      },
    });
  }

  let user1 = await prisma.user.findUnique({
    where: {
      id: 'ldb27ibhoxrm3mcr4dxmjcbu',
    },
  });

  if (!user1) {
    user1 = await prisma.user.create({
      data: {
        id: 'ldb27ibhoxrm3mcr4dxmjcbu',
        roles: ['MERCHANT_USER', 'USER'],
        walletAddress: '0x1b3Cc39D0B70A1074188434f3B9E8E90F91611ac',
      },
    });
  }
  let user2 = await prisma.user.findUnique({
    where: {
      id: 'did:privy:cmbw729mt00aajl0lo5nb5kh7',
    },
  });

  if (!user2) {
    user2 = await prisma.user.create({
      data: {
        id: 'did:privy:cmbw729mt00aajl0lo5nb5kh7',
        roles: ['MERCHANT_USER', 'USER'],
        walletAddress: '0x8A406938111C0e29534FFf25810c04277cf3B2de',
      },
    });
  }

  let user3 = await prisma.user.findUnique({
    where: {
      id: 'did:privy:cmbw729mt00aajl0lo5nb5kh7',
    },
  });

  if (!user3) {
    user3 = await prisma.user.create({
      data: {
        id: 'did:privy:cmbw729mt00aajl0lo5nb5kh7',
        roles: ['MERCHANT_USER', 'USER'],
        walletAddress: '0x30182BcF8331120492f2f7eCb5C499C3bF70559f',
      },
    });
  }

  // Use user3 as test-user-1 (did:privy:cmbw729mt00aajl0lo5nb5kh7)
  let testUser1 = user3;

  let testUser2 = await prisma.user.findUnique({
    where: {
      id: 'test-user-2',
    },
  });

  if (!testUser2) {
    testUser2 = await prisma.user.create({
      data: {
        id: 'test-user-2',
        roles: ['USER'],
        walletAddress: '0x853e46Dd7745D5643036C6634C0532925a3b8D4C',
      },
    });
  }

  // Create merchant relationships
  const userStore1 = await prisma.userStore.findUnique({
    where: {
      userId_storeId_isMerchant: {
        storeId: mcdonalds.id,
        userId: user1.id,
        isMerchant: true,
      },
      userId: user1.id,
      storeId: mcdonalds.id,
    },
  });

  if (!userStore1) {
    await prisma.userStore.create({
      data: {
        userId: user1.id,
        storeId: mcdonalds.id,
        isMerchant: true,
      },
    });
  }

  const userStore2 = await prisma.userStore.findUnique({
    where: {
      userId_storeId_isMerchant: {
        storeId: ethkyiv.id,
        userId: user1.id,
        isMerchant: true,
      },
      userId: user1.id,
      storeId: ethkyiv.id,
    },
  });

  if (!userStore2) {
    await prisma.userStore.create({
      data: {
        userId: user1.id,
        storeId: ethkyiv.id,
        isMerchant: true,
      },
    });
  }

  const userStore3 = await prisma.userStore.findUnique({
    where: {
      userId_storeId_isMerchant: {
        storeId: lvivcroissants.id,
        userId: user2.id,
        isMerchant: true,
      },
      userId: user2.id,
      storeId: lvivcroissants.id,
    },
  });

  if (!userStore3) {
    await prisma.userStore.create({
      data: {
        userId: user2.id,
        storeId: lvivcroissants.id,
        isMerchant: true,
      },
    });
  }

  const userStore4 = await prisma.userStore.findUnique({
    where: {
      userId_storeId_isMerchant: {
        storeId: ethkyiv.id,
        userId: user3.id,
        isMerchant: true,
      },
      userId: user3.id,
      storeId: ethkyiv.id,
    },
  });

  if (!userStore4) {
    await prisma.userStore.create({
      data: {
        userId: user3.id,
        storeId: ethkyiv.id,
        isMerchant: true,
      },
    });
  }

  const userStore5 = await prisma.userStore.findUnique({
    where: {
      userId_storeId_isMerchant: {
        storeId: aromakava.id,
        userId: user3.id,
        isMerchant: true,
      },
      userId: user3.id,
      storeId: aromakava.id,
    },
  });

  if (!userStore5) {
    await prisma.userStore.create({
      data: {
        userId: user3.id,
        storeId: aromakava.id,
        isMerchant: true,
      },
    });
  }

  // Create customer relationships with points for testing

  // Test User 1 (user3 - did:privy:cmbw729mt00aajl0lo5nb5kh7) - has points at multiple stores
  const customerStore1 = await prisma.userStore.upsert({
    where: {
      userId_storeId_isMerchant: {
        storeId: mcdonalds.id,
        userId: testUser1.id,
        isMerchant: false,
      },
    },
    update: {
      bonusesAmount: 250, // Enough points for mid-tier rewards
    },
    create: {
      userId: testUser1.id,
      storeId: mcdonalds.id,
      isMerchant: false,
      bonusesAmount: 250,
    },
  });

  const customerStore2 = await prisma.userStore.upsert({
    where: {
      userId_storeId_isMerchant: {
        storeId: aromakava.id,
        userId: testUser1.id,
        isMerchant: false,
      },
    },
    update: {
      bonusesAmount: 150, // Moderate points
    },
    create: {
      userId: testUser1.id,
      storeId: aromakava.id,
      isMerchant: false,
      bonusesAmount: 150,
    },
  });

  const customerStore3 = await prisma.userStore.upsert({
    where: {
      userId_storeId_isMerchant: {
        storeId: lvivcroissants.id,
        userId: testUser1.id,
        isMerchant: false,
      },
    },
    update: {
      bonusesAmount: 500, // High points for premium rewards
    },
    create: {
      userId: testUser1.id,
      storeId: lvivcroissants.id,
      isMerchant: false,
      bonusesAmount: 500,
    },
  });

  const customerStore4 = await prisma.userStore.upsert({
    where: {
      userId_storeId_isMerchant: {
        storeId: ethkyiv.id,
        userId: testUser1.id,
        isMerchant: false,
      },
    },
    update: {
      bonusesAmount: 75, // Low points to test insufficient funds scenarios
    },
    create: {
      userId: testUser1.id,
      storeId: ethkyiv.id,
      isMerchant: false,
      bonusesAmount: 75,
    },
  });

  // Test User 2 - has different point distribution
  const customerStore5 = await prisma.userStore.upsert({
    where: {
      userId_storeId_isMerchant: {
        storeId: mcdonalds.id,
        userId: testUser2.id,
        isMerchant: false,
      },
    },
    update: {
      bonusesAmount: 50, // Low points
    },
    create: {
      userId: testUser2.id,
      storeId: mcdonalds.id,
      isMerchant: false,
      bonusesAmount: 50,
    },
  });

  const customerStore6 = await prisma.userStore.upsert({
    where: {
      userId_storeId_isMerchant: {
        storeId: aromakava.id,
        userId: testUser2.id,
        isMerchant: false,
      },
    },
    update: {
      bonusesAmount: 300, // High points
    },
    create: {
      userId: testUser2.id,
      storeId: aromakava.id,
      isMerchant: false,
      bonusesAmount: 300,
    },
  });

  // Give existing users some customer points too
  const existingUserStore1 = await prisma.userStore.upsert({
    where: {
      userId_storeId_isMerchant: {
        storeId: aromakava.id,
        userId: user1.id,
        isMerchant: false,
      },
    },
    update: {
      bonusesAmount: 120,
    },
    create: {
      userId: user1.id,
      storeId: aromakava.id,
      isMerchant: false,
      bonusesAmount: 120,
    },
  });

  const existingUserStore2 = await prisma.userStore.upsert({
    where: {
      userId_storeId_isMerchant: {
        storeId: lvivcroissants.id,
        userId: user1.id,
        isMerchant: false,
      },
    },
    update: {
      bonusesAmount: 200,
    },
    create: {
      userId: user1.id,
      storeId: lvivcroissants.id,
      isMerchant: false,
      bonusesAmount: 200,
    },
  });

  // Create diverse loyalty rewards for each store
  console.log('Creating loyalty rewards...');

  // McDonald's rewards
  const mcdonaldsRewards = [
    {
      name: '10% Off Any Meal',
      description: 'Get 10% discount on any meal purchase',
      type: 'DISCOUNT_PERCENTAGE' as const,
      value: 10,
      pointsRequired: 100,
      maxRedemptions: 50,
    },
    {
      name: 'Free Small Fries',
      description: 'Complimentary small fries with any purchase',
      type: 'FREE_ITEM' as const,
      value: 2.99,
      pointsRequired: 150,
      maxRedemptions: 30,
    },
    {
      name: '$5 Off Order',
      description: 'Fixed $5 discount on orders over $15',
      type: 'DISCOUNT_FIXED' as const,
      value: 5,
      pointsRequired: 200,
      maxRedemptions: 25,
    },
    {
      name: 'Free Big Mac',
      description: 'Complimentary Big Mac burger',
      type: 'FREE_ITEM' as const,
      value: 5.99,
      pointsRequired: 300,
      maxRedemptions: 20,
    },
    {
      name: 'Happy Hour Special',
      description: 'Buy one get one free on selected items between 2-4 PM',
      type: 'SPECIAL_OFFER' as const,
      value: 0,
      pointsRequired: 250,
      maxRedemptions: 15,
    },
  ];

  for (const reward of mcdonaldsRewards) {
    await prisma.loyaltyReward.upsert({
      where: {
        id: `mcdonalds-${reward.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
      update: reward,
      create: {
        id: `mcdonalds-${reward.name.toLowerCase().replace(/\s+/g, '-')}`,
        storeId: mcdonalds.id,
        ...reward,
      },
    });
  }

  // Aroma Kava rewards
  const aromaKavaRewards = [
    {
      name: 'Free Coffee Upgrade',
      description: 'Upgrade any coffee size for free',
      type: 'FREE_ITEM' as const,
      value: 1.5,
      pointsRequired: 80,
      maxRedemptions: 40,
    },
    {
      name: '15% Off Coffee & Pastry',
      description: 'Get 15% off when you buy coffee with any pastry',
      type: 'DISCOUNT_PERCENTAGE' as const,
      value: 15,
      pointsRequired: 120,
      maxRedemptions: 35,
    },
    {
      name: 'Free Croissant',
      description: 'Complimentary croissant with coffee purchase',
      type: 'FREE_ITEM' as const,
      value: 3.5,
      pointsRequired: 160,
      maxRedemptions: 25,
    },
    {
      name: '$3 Off Any Order',
      description: 'Fixed $3 discount on any order',
      type: 'DISCOUNT_FIXED' as const,
      value: 3,
      pointsRequired: 140,
      maxRedemptions: 30,
    },
    {
      name: 'Loyalty Card Bonus',
      description: 'Double points on your next 3 visits',
      type: 'SPECIAL_OFFER' as const,
      value: 0,
      pointsRequired: 200,
      maxRedemptions: 20,
    },
  ];

  for (const reward of aromaKavaRewards) {
    await prisma.loyaltyReward.upsert({
      where: {
        id: `aromakava-${reward.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
      update: reward,
      create: {
        id: `aromakava-${reward.name.toLowerCase().replace(/\s+/g, '-')}`,
        storeId: aromakava.id,
        ...reward,
      },
    });
  }

  // Lviv Croissants rewards
  const lvivCroissantsRewards = [
    {
      name: 'Free Mini Croissant',
      description: 'Complimentary mini croissant with any purchase',
      type: 'FREE_ITEM' as const,
      value: 2.0,
      pointsRequired: 90,
      maxRedemptions: 50,
    },
    {
      name: '20% Off Bakery Items',
      description: 'Get 20% discount on all bakery products',
      type: 'DISCOUNT_PERCENTAGE' as const,
      value: 20,
      pointsRequired: 180,
      maxRedemptions: 30,
    },
    {
      name: 'Free Coffee with Pastry',
      description: 'Complimentary coffee when you buy any pastry',
      type: 'FREE_ITEM' as const,
      value: 2.5,
      pointsRequired: 130,
      maxRedemptions: 40,
    },
    {
      name: '$7 Off Large Orders',
      description: 'Fixed $7 discount on orders over $20',
      type: 'DISCOUNT_FIXED' as const,
      value: 7,
      pointsRequired: 280,
      maxRedemptions: 20,
    },
    {
      name: "Baker's Choice Box",
      description: 'Get a surprise box of 6 assorted pastries',
      type: 'SPECIAL_OFFER' as const,
      value: 15,
      pointsRequired: 400,
      maxRedemptions: 10,
    },
    {
      name: 'VIP Early Access',
      description: 'Get early access to new seasonal items',
      type: 'SPECIAL_OFFER' as const,
      value: 0,
      pointsRequired: 500,
      maxRedemptions: 15,
    },
  ];

  for (const reward of lvivCroissantsRewards) {
    await prisma.loyaltyReward.upsert({
      where: {
        id: `lvivcruasants-${reward.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
      update: reward,
      create: {
        id: `lvivcruasants-${reward.name.toLowerCase().replace(/\s+/g, '-')}`,
        storeId: lvivcroissants.id,
        ...reward,
      },
    });
  }

  // ETHKyiv rewards
  const ethKyivRewards = [
    {
      name: 'Free Event T-Shirt',
      description: 'Complimentary ETHKyiv branded t-shirt',
      type: 'FREE_ITEM' as const,
      value: 25,
      pointsRequired: 100,
      maxRedemptions: 100,
    },
    {
      name: '50% Off Workshop',
      description: 'Half price on any premium workshop',
      type: 'DISCOUNT_PERCENTAGE' as const,
      value: 50,
      pointsRequired: 200,
      maxRedemptions: 50,
    },
    {
      name: 'Free Lunch Voucher',
      description: 'Complimentary lunch during the event',
      type: 'FREE_ITEM' as const,
      value: 15,
      pointsRequired: 150,
      maxRedemptions: 200,
    },
    {
      name: 'VIP Networking Access',
      description: 'Access to exclusive VIP networking sessions',
      type: 'SPECIAL_OFFER' as const,
      value: 0,
      pointsRequired: 300,
      maxRedemptions: 30,
    },
    {
      name: 'Mentor Session',
      description: '1-on-1 session with industry mentors',
      type: 'SPECIAL_OFFER' as const,
      value: 100,
      pointsRequired: 400,
      maxRedemptions: 20,
    },
  ];

  for (const reward of ethKyivRewards) {
    await prisma.loyaltyReward.upsert({
      where: {
        id: `ethkyiv-${reward.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
      update: reward,
      create: {
        id: `ethkyiv-${reward.name.toLowerCase().replace(/\s+/g, '-')}`,
        storeId: ethkyiv.id,
        ...reward,
      },
    });
  }

  // Create sample redemption history
  console.log('Creating sample redemption history...');

  // Get some rewards for redemptions
  const mcdonaldsFreeItem = await prisma.loyaltyReward.findFirst({
    where: { storeId: mcdonalds.id, type: 'FREE_ITEM' },
  });
  const aromaKavaDiscount = await prisma.loyaltyReward.findFirst({
    where: { storeId: aromakava.id, type: 'DISCOUNT_PERCENTAGE' },
  });
  const lvivSpecialOffer = await prisma.loyaltyReward.findFirst({
    where: { storeId: lvivcroissants.id, type: 'SPECIAL_OFFER' },
  });

  // Create redemptions with different statuses
  if (mcdonaldsFreeItem) {
    await prisma.rewardRedemption.upsert({
      where: {
        id: 'redemption-1',
      },
      update: {},
      create: {
        id: 'redemption-1',
        userId: testUser1.id,
        storeId: mcdonalds.id,
        rewardId: mcdonaldsFreeItem.id,
        pointsUsed: mcdonaldsFreeItem.pointsRequired,
        status: 'USED',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
    });

    await prisma.rewardRedemption.upsert({
      where: {
        id: 'redemption-2',
      },
      update: {},
      create: {
        id: 'redemption-2',
        userId: testUser2.id,
        storeId: mcdonalds.id,
        rewardId: mcdonaldsFreeItem.id,
        pointsUsed: mcdonaldsFreeItem.pointsRequired,
        status: 'APPROVED',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      },
    });
  }

  if (aromaKavaDiscount) {
    await prisma.rewardRedemption.upsert({
      where: {
        id: 'redemption-3',
      },
      update: {},
      create: {
        id: 'redemption-3',
        userId: testUser1.id,
        storeId: aromakava.id,
        rewardId: aromaKavaDiscount.id,
        pointsUsed: aromaKavaDiscount.pointsRequired,
        status: 'PENDING',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      },
    });

    await prisma.rewardRedemption.upsert({
      where: {
        id: 'redemption-4',
      },
      update: {},
      create: {
        id: 'redemption-4',
        userId: user1.id,
        storeId: aromakava.id,
        rewardId: aromaKavaDiscount.id,
        pointsUsed: aromaKavaDiscount.pointsRequired,
        status: 'REJECTED',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      },
    });
  }

  if (lvivSpecialOffer) {
    await prisma.rewardRedemption.upsert({
      where: {
        id: 'redemption-5',
      },
      update: {},
      create: {
        id: 'redemption-5',
        userId: testUser1.id,
        storeId: lvivcroissants.id,
        rewardId: lvivSpecialOffer.id,
        pointsUsed: lvivSpecialOffer.pointsRequired,
        status: 'USED',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
    });
  }

  // Update current redemptions count for rewards that have been redeemed
  if (mcdonaldsFreeItem) {
    await prisma.loyaltyReward.update({
      where: { id: mcdonaldsFreeItem.id },
      data: { currentRedemptions: 2 },
    });
  }

  if (aromaKavaDiscount) {
    await prisma.loyaltyReward.update({
      where: { id: aromaKavaDiscount.id },
      data: { currentRedemptions: 2 },
    });
  }

  if (lvivSpecialOffer) {
    await prisma.loyaltyReward.update({
      where: { id: lvivSpecialOffer.id },
      data: { currentRedemptions: 1 },
    });
  }

  console.log('Seed finished with comprehensive loyalty system data!');
  console.log('');
  console.log('=== TESTING DATA SUMMARY ===');
  console.log('');
  console.log('🏪 STORES:');
  console.log('- MacDonalds (macdonalds)');
  console.log('- Aroma Kava (aromakava)');
  console.log('- Lviv Croissants (lvivcruasants)');
  console.log('- ETHKyiv (ethkyiv)');
  console.log('');
  console.log('👥 TEST USERS:');
  console.log(
    '- did:privy:cmbw729mt00aajl0lo5nb5kh7: Has points at all stores (250, 150, 500, 75)',
  );
  console.log(
    "- test-user-2: Has points at McDonald's (50) and Aroma Kava (300)",
  );
  console.log('- Existing users also have customer points for testing');
  console.log('');
  console.log('🎁 REWARDS PER STORE:');
  console.log('- MacDonalds: 5 rewards (discounts, free items, specials)');
  console.log('- Aroma Kava: 5 rewards (coffee upgrades, pastry deals)');
  console.log('- Lviv Croissants: 6 rewards (bakery items, VIP access)');
  console.log('- ETHKyiv: 5 rewards (event perks, networking, mentoring)');
  console.log('');
  console.log('📋 REDEMPTION HISTORY:');
  console.log('- 5 sample redemptions with different statuses');
  console.log('- USED, APPROVED, PENDING, REJECTED statuses covered');
  console.log('- Spread across different stores and users');
  console.log('');
  console.log('🧪 TESTING SCENARIOS COVERED:');
  console.log('- Users with sufficient points for various reward tiers');
  console.log(
    '- Users with insufficient points (did:privy:cmbw729mt00aajl0lo5nb5kh7 at ETHKyiv: 75 points)',
  );
  console.log(
    '- Different reward types: discounts, free items, special offers',
  );
  console.log('- Redemption history with all possible statuses');
  console.log('- Multiple stores per user for comprehensive testing');
  console.log('- Merchant and customer roles for the same users');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
