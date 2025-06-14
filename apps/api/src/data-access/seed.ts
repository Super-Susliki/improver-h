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
          'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nfl_sharing_logos/mc_donalds_logo_png_4c_black.png?$mcd_sharing_logo$',
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
        description: 'ETHKyiv is a',
        logoUrl:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fx.com%2Fethkyiv_&psig=AOvVaw3tqq5kn2laXHDUMmHd6ADs&ust=1749991271050000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiF4tX38I0DFQAAAAAdAAAAABAE',
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
  let userStore1 = await prisma.userStore.findUnique({
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

  let userStore2 = await prisma.userStore.findUnique({
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

  let userStore3 = await prisma.userStore.findUnique({
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

  console.log('Seed finished');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
