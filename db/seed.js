const client = require("./index.js");
const { createPlant, getPlants } = require("./plants.js");
const { createUser, getUsers } = require("./users.js");
const { addPlantToUser, getUserPlantsByUserId } = require("./user_plants.js");

const dropTables = async () => {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
            DROP TABLE IF EXISTS list_plants;
            DROP TABLE IF EXISTS user_plants;
            DROP TABLE IF EXISTS lists;
            DROP TABLE IF EXISTS plants;
            DROP TABLE IF EXISTS users;
        `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error(error);
  }
};

const createTables = async () => {
  try {
    console.log("Starting to create tables...");

    await client.query(`
            CREATE TABLE plants(
                id SERIAL PRIMARY KEY,
                name VARCHAR(225) UNIQUE NOT NULL,
                description TEXT NOT NULL,
                category VARCHAR(225) NOT NULL,
                "imageURL" TEXT NOT NULL
            );

            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                "firstName" VARCHAR(225) NOT NULL,
                "lastName" VARCHAR(225) NOT NULL,
                username VARCHAR(225) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT false
            );

            CREATE TABLE user_plants(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                "plantId" INTEGER REFERENCES plants(id),
                UNIQUE ("userId", "plantId")
            );
        `);

    console.log("Finished creating tables!");
  } catch (error) {
    console.error(error);
  }
};

const createPlantsData = async () => {
  try {
    console.log("Inserting plants data...");
    const plantsData = [
      {
        name: "Snake Plant",
        description:
          "Versatile, attractive, and easy-to-care-for plant that adds a touch of elegance to any indoor or outdoor space.",
        category: "Succulent",
        imageURL:
          "https://images.unsplash.com/photo-1611211232932-da3113c5b960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      },
      {
        name: "Monstera",
        description:
          "A popular choice among plant enthusiasts and interior decorators due to its striking foliage, adaptability, and unique growth pattern.",
        category: "Tropical",
        imageURL:
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
      },
      {
        name: "Spider Plant",
        description:
          "A versatile, resilient, and visually appealing houseplant that adds a touch of greenery and elegance to any indoor space. Its graceful arching foliage and ability to produce plantlets make it a popular choice for hanging baskets or as a trailing plant on shelves or countertops.",
        category: "Tropical",
        imageURL:
          "https://images.unsplash.com/photo-1611527664689-d430dd2a6774?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
      },
      {
        name: "English Ivy",
        description:
          "An attractive plant that adds a touch of elegance and greenery to various settings. Whether used as a climber, ground cover, or trailing plant, it brings a classic and timeless beauty to gardens, landscapes, and indoor spaces.",
        category: "Vine",
        imageURL:
          "https://images.unsplash.com/photo-1528142445702-6baa5c1fb266?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      },
      {
        name: "Dragon Tree",
        description:
          "Its unique appearance and adaptability makes it a captivating addition to indoor spaces, providing a touch of exotic beauty and a sense of intrigue.",
        category: "Tropical",
        imageURL:
          "https://images.unsplash.com/photo-1586998474523-8a52e8ad3a0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      },
      {
        name: "Silver Dollar Vine",
        description:
          "A captivating and unique succulent vine that adds a touch of texture and silver-green beauty to any indoor or outdoor space. Its drought tolerance, easy care requirements, and distinctive foliage make it a popular choice among succulent enthusiasts and those looking for an interesting trailing or climbing plant.",
        category: "Vine",
        imageURL:
          "https://as1.ftcdn.net/v2/jpg/02/91/99/06/1000_F_291990609_WjkzdvMY8P4gCmfz8sQUmNr979J6PC5m.jpg",
      },
      {
        name: "Inchplant",
        description:
          "A popular choice among plant enthusiasts due to its vibrant foliage, trailing growth habit, and ease of care. Whether used as a hanging plant or ground cover, it adds a touch of color and liveliness to any indoor or outdoor space.",
        category: "Vine",
        imageURL:
          "https://images.pexels.com/photos/4857760/pexels-photo-4857760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Heartleaf Philodendron",
        description:
          "A versatile, low-maintenance, and visually appealing houseplant. Its heart-shaped leaves and trailing vines bring a touch of greenery and natural beauty to indoor spaces, making it a popular choice among plant enthusiasts.",
        category: "Vine",
        imageURL:
          "https://images.pexels.com/photos/9413775/pexels-photo-9413775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Guiana Chestnut",
        description:
          "Visually striking and resilient houseplant that adds a touch of tropical elegance to indoor spaces. Its unique trunk, lush foliage, and cultural significance make it a popular choice among plant enthusiasts and those looking to bring a touch of nature and good fortune into their homes.",
        category: "Tropical",
        imageURL:
          "https://images.pexels.com/photos/11448997/pexels-photo-11448997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Fiddle Leaf Fig",
        description:
          "Visually striking and elegant houseplant that adds a touch of nature and sophistication to indoor spaces. Its sculptural leaves and architectural presence make it a favorite choice among plant enthusiasts and interior designers alike.",
        category: "Tropical",
        imageURL:
          "https://images.pexels.com/photos/7084309/pexels-photo-7084309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Peacock Plant",
        description:
          "With its vibrant foliage and unique leaf movements, the Peacock Plant adds a touch of tropical elegance and visual interest to any indoor space. While it may require a bit more care compared to some other houseplants, its stunning appearance and decorative appeal make it a favorite among plant enthusiasts and collectors.",
        category: "Tropical",
        imageURL:
          "https://images.pexels.com/photos/13622972/pexels-photo-13622972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        name: "Ponytail Palm",
        description:
          "The Ponytail Palm is a unique and visually appealing plant that adds a touch of tropical elegance to indoor and outdoor spaces. Its resilience and easy care requirements make it a popular choice for plant enthusiasts of all levels of experience.",
        category: "Tropical",
        imageURL:
          "https://img.freepik.com/premium-photo/beaucarnea-recurvata-also-known-as-ponytail-palm-nolina_328946-361.jpg?w=740",
      },
      {
        name: "Variegated Wax Plant",
        description:
          "A beautiful and versatile houseplant that brings a touch of elegance and fragrance to indoor spaces. Its variegated leaves, charming flowers, and relatively easy care requirements make it a popular choice among plant enthusiasts and collectors.",
        category: "Flowering",
        imageURL:
          "https://st3.depositphotos.com/29793294/37629/i/450/depositphotos_376291664-stock-photo-soft-focus-fleshy-variegated-leaves.jpg",
      },
      {
        name: "Paddle Plant",
        description:
          "The Paddle Plant is a fascinating and visually appealing succulent that adds a unique touch to any indoor or outdoor space. Its paddle-shaped leaves, color-changing capabilities, and easy care requirements make it a favorite among succulent enthusiasts and collectors.",
        category: "Succulent",
        imageURL:
          "https://st4.depositphotos.com/16173130/41133/i/450/depositphotos_411336476-stock-photo-paddle-plant-kalanchoe-thyrsiflora-crassulaceae.jpg",
      },
      {
        name: "Prayer Plant",
        description:
          "With its vibrant foliage, unique leaf movements, and relatively easy care requirements, the Prayer Plant is a popular choice among plant enthusiasts. It adds a touch of tropical beauty and liveliness to indoor spaces and can be a delightful addition to any plant collection.",
        category: "Tropical",
        imageURL:
          "https://st2.depositphotos.com/29793294/42659/i/450/depositphotos_426595362-stock-photo-maranta-leuconeura-var-erythroneura-fascinator.jpg",
      },
      {
        name: "Clivia",
        description:
          "A captivating and resilient plant that adds a splash of color and elegance to indoor and shaded outdoor spaces. Its beautiful flowers and glossy foliage make it a popular choice among plant enthusiasts who appreciate its ability to thrive in low-light conditions and its stunning floral display.",
        category: "Flowering",
        imageURL:
          "https://st4.depositphotos.com/4583323/28325/i/450/depositphotos_283252382-stock-photo-blossoming-branch-of-orange-flowers.jpg",
      },
      {
        name: "Jade Plant",
        description:
          "Its ability to thrive in various light conditions and its adaptability to infrequent watering make it an excellent choice for beginners and experienced plant caretakers alike.",
        category: "Succulent",
        imageURL:
          "https://st2.depositphotos.com/39757792/47427/i/450/depositphotos_474279548-stock-photo-crassula-ovata-commonly-known-as.jpg",
      },
      {
        name: "Baby Jade Plant",
        description:
          "A charming succulent that brings a touch of greenery to small spaces and is ideal for succulent enthusiasts with limited room. Its compact size, attractive foliage, and easy care requirements make it a popular choice for indoor gardening and succulent collections",
        category: "Succulent",
        imageURL:
          "https://st3.depositphotos.com/1001944/14892/i/450/depositphotos_148921091-stock-photo-houseplant-crassula-ovata-jade-plant.jpg",
      },
      {
        name: "Variegated Arrowhead Vine",
        description:
          "Its adaptability to different light conditions and relatively easy care requirements make it a popular choice for indoor gardening, adding a touch of charm and greenery to any space.",
        category: "Tropical",
        imageURL:
          "https://st.depositphotos.com/1605581/52095/i/450/depositphotos_520950018-stock-photo-syngonium-podophyllum-common-names-arrowhead.jpg",
      },
      {
        name: "Christmas Cactus",
        description:
          "With proper care, the Christmas Cactus can be a long-lived and rewarding houseplant, offering a burst of vibrant color and beauty during the holiday season. Its ability to thrive indoors and its striking floral display make it a beloved choice for plant enthusiasts looking to add a festive touch to their homes.",
        category: "Flowering",
        imageURL:
          "https://st3.depositphotos.com/19600372/32884/i/450/depositphotos_328840284-stock-photo-christmas-cactus-flower-pot.jpg",
      },
      {
        name: "Dumb Cane",
        description:
          "With its attractive foliage and ability to adapt to indoor conditions, Dumb Cane can be a stunning addition to any home or office space. However, it's important to handle the plant with care and keep it out of reach of children and pets due to its potential toxicity. With proper care and attention, Dumb Cane can thrive and bring a touch of tropical beauty to your indoor environment.",
        category: "Tropical",
        imageURL:
          "https://st4.depositphotos.com/18237052/38976/i/450/depositphotos_389768422-stock-photo-dieffenbachia-dumb-canes-plant-black.jpg",
      },
      {
        name: "Swiss Cheese Plant",
        description:
          "The Swiss Cheese Plant is an excellent choice for those looking to bring a touch of the tropics into their homes. Its large, unique leaves and easy-care requirements make it a popular and rewarding houseplant. With the right conditions and care, it can become a stunning focal point in any indoor space.",
        category: "Tropical",
        imageURL:
          "https://st2.depositphotos.com/3009677/50637/i/450/depositphotos_506378960-stock-photo-monstera-herricane-plant-swiss-cheese.jpg",
      },
      {
        name: "Weeping Fig",
        description:
          "With its graceful weeping branches and lush foliage, the Weeping Fig can add a touch of elegance and greenery to any indoor space. With proper care and attention to watering and light conditions, this versatile houseplant can thrive and become a beautiful focal point in your home or office.",
        category: "Tropical",
        imageURL:
          "https://st.depositphotos.com/1006791/2019/i/450/depositphotos_20197907-stock-photo-ficus-benjamina.jpg",
      },
      {
        name: "Hoya Tricolor",
        description:
          "Hoya tricolor is a captivating and relatively low-maintenance houseplant that can add a touch of elegance to any indoor space. With its variegated leaves and fragrant flowers, it is sure to be a beautiful addition to your collection. With proper care, this plant will reward you with its stunning foliage and occasional blossoms.",
        category: "Tropical",
        imageURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_OvbXQx4q0CXooq8gYCnqaQZzEUNqlwxwRXbH5s1ikQ&s",
      },
      {
        name: "Bunny Ear Cactus",
        description:
          "The Bunny Ear Cactus is a visually appealing and low-maintenance cactus that can add a touch of whimsy to your indoor or outdoor space. With its unique bunny ear-shaped pads and minimal care requirements, it is a great choice for cactus enthusiasts of all levels.",
        category: "Succulent",
        imageURL:
          "https://media.istockphoto.com/id/1318792433/photo/cactus-opuntia-in-pot.jpg?s=612x612&w=0&k=20&c=YxWlcD3wB6HewhcOzXONYEK6i_941CZpRuMc_ckv5bY=",
      },
      {
        name: "Parlor Palm",
        description:
          "The Parlor Palm is a beautiful and adaptable indoor palm that can bring a tropical touch to any home or office space. With its elegant foliage and easy care requirements, it is an excellent choice for both experienced and novice plant enthusiasts.",
        category: "Tropical",
        imageURL:
          "https://thumbs.dreamstime.com/b/small-parlour-palm-chamaedorea-elegans-houseplant-white-background-close-up-delicate-feathery-leaves-foliage-against-186767558.jpg",
      },
      {
        name: "Zebra Plant",
        description:
          "The Zebra Plant is a stunning and decorative houseplant that can add a touch of exotic beauty to any indoor space. With its distinctive zebra-like stripes and relatively moderate care requirements, it is a popular choice among plant enthusiasts and a great addition to tropical-themed or greenery-filled environments.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/970007698/photo/calathea-ornata-leaves-tropical-foliage-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=k0xtjsKTfv2iIniXPBIfNfYWF9GzWhqk8MyWvraFnVs=",
      },
      {
        name: "Emerald Ripple Peperomia",
        description:
          "The Emerald Ripple Peperomia is a delightful and easy-to-care-for houseplant that adds a touch of lush greenery to any indoor space. With its attractive textured leaves and compact size, it is a versatile choice for various settings, from offices to homes.",
        category: "Tropical",
        imageURL:
          "https://st4.depositphotos.com/6401992/26519/i/600/depositphotos_265191440-stock-photo-peperomia-caperata-house-plant.jpg",
      },
      {
        name: "Polka Dot Begonia",
        description:
          "The Polka Dot Begonia is a striking and visually appealing houseplant that adds a touch of whimsy and elegance to any indoor space. With its unique polka dot patterns and relatively easy care requirements, it is a sought-after choice among plant enthusiasts and a beautiful addition to any plant collection.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/1308052029/photo/beautiful-house-plant-begonia-maculata-or-the-polka-dot-begonia-with-spots-on-the-dark-olive.jpg?s=612x612&w=0&k=20&c=XMGZiYymeY9yq8ZO9A9MAtm8h_kCVgTmT1TvBynY5y8=",
      },
      {
        name: "Kalanchoe",
        description:
          "Kalanchoes are lovely and relatively low-maintenance plants that can brighten up indoor spaces or gardens with their colorful blooms and succulent foliage. With proper care, they can provide long-lasting beauty and enjoyment.",
        category: "Flowering",
        imageURL:
          "https://media.istockphoto.com/id/1202667570/photo/red-kalanchoe-flowers-on-a-wooden-background.jpg?s=612x612&w=0&k=20&c=C7KpGdphTRnOKaAmdMxmm63gjxSzraLxkDsCa6LoGYQ=",
      },
      {
        name: "Anthurium",
        description:
          "Anthuriums are prized for their stunning flowers and attractive foliage. With proper care, they can be long-lasting and rewarding houseplants, adding a tropical and elegant touch to any indoor or outdoor space.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/470346506/photo/flamingo-flower.jpg?s=612x612&w=0&k=20&c=lw8m7eShvv98p_WmZ1Yn5a-A1z6pMkmR2dK_y-ZK_60=",
      },
      {
        name: "ZZ Plant",
        description:
          "Overall, the ZZ Plant is a versatile and visually appealing houseplant that can thrive in a variety of indoor conditions. Its glossy foliage and low-maintenance nature make it an excellent choice for beginners or those looking for a resilient and attractive addition to their plant collection.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/1219720875/photo/zanzibar-gem-or-zz-plant-on-the-windowsill.jpg?s=612x612&w=0&k=20&c=S6Y4RbXZPzq-7DX-vALeszB6GO7or5uEbYWui7BuT74=",
      },
      {
        name: "Coffee Plant",
        description:
          "Growing coffee plants indoors can be challenging, and it may take several years before they start producing beans. However, they can still serve as attractive and conversation-starting houseplants, even without the expectation of a coffee harvest.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/931586060/photo/red-coffee-beans-on-a-branch-of-coffee-tree-with-leaves-ripe-and-unripe-coffee-beans-isolated.jpg?s=612x612&w=0&k=20&c=4JQtrGnRIO6hQBTeOz4r0cLxW4ZiTE-SHkrFlqykiWw=",
      },
      {
        name: "Dracaena Warneckii",
        description:
          "The Warneckii Dracaena is a beautiful and versatile houseplant that adds a touch of sophistication to any indoor setting. With its attractive striped foliage and adaptability to various light conditions, it is a popular choice among plant enthusiasts and a great addition to home or office decor.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/901050020/photo/potted-dracaena-warneckii-varigate-lemon-lime-isolated-on-white.jpg?s=612x612&w=0&k=20&c=R5V0sMukSt1wZk-i56IQswHXNLDbXlcBMcI0mdt8CEc=",
      },
      {
        name: "Red Aglaonema",
        description:
          "With its vibrant red foliage and adaptability to low light conditions, it adds color and beauty to indoor spaces, making it a popular choice among plant enthusiasts.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/1298223819/photo/algonema.jpg?s=612x612&w=0&k=20&c=kuQtyrfDvYUVvoWh-kF7TtrZOrDfk5Xzc6LrkPJMc7E=",
      },
      {
        name: "Gerbera Daisy",
        description:
          "Gerbera Daisies are cherished for their cheerful and colorful flowers. With proper care and attention to their specific needs, they can bring joy and beauty to gardens, containers, or indoor environments.",
        category: "Flowering",
        imageURL:
          "https://media.istockphoto.com/id/1219975496/photo/colorful-gerber-daisies-in-a-glass-vase-on-a-wooden-table-in-a-bright-modern-room-retro.jpg?s=612x612&w=0&k=20&c=Z4lxmLTcprsMwQGtoHTMxQahSg4mMEovnXXc7YzIdhE=",
      },
      {
        name: "Chinese Evergreen",
        description:
          "With its low maintenance requirements and ability to thrive in various indoor environments, it is a popular choice for plant enthusiasts and a great addition to home or office spaces.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/1323439254/photo/tropical-aglaonema-stripes-houseplant-with-long-leaves-with-silver-stripe-pattern.jpg?s=612x612&w=0&k=20&c=2fDXj0ixp-nkNvNSCMGkyhwPOkrw_NaRqQLXxKtW0vY=",
      },
      {
        name: "Croton",
        description:
          "Croton plants are prized for their stunning foliage and can add a bold and tropical touch to indoor and outdoor spaces. With proper care and attention to their specific needs, they can be a focal point and conversation starter in your home or garden.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/1194399139/photo/croton-plant-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=8PfPypS7Sg18U1eZz9j5iCQFyaicVAZK6y9TRNV-qFo=",
      },
      {
        name: "Aralia",
        description:
          "It's worth noting that some Aralia species can have thorns or spines, so care should be taken when handling or pruning these plants. Additionally, the taxonomy of the Aralia genus is complex, with many species and varieties, so it's recommended to consult specific plant references or local experts for detailed information on the particular Aralia species you are interested in.",
        category: "Flowering",
        imageURL:
          "https://media.istockphoto.com/id/925874096/photo/home-plant-japanese-fatsia-in-a-pot.jpg?s=612x612&w=0&k=20&c=Nuy-P23CTgfqMNoJjU-U0BPRT0yQx34yVkMD3A7mBX0=",
      },
      {
        name: "Dwarf Umbrella Tree",
        description:
          "With proper care, the Dwarf Umbrella Tree can be a beautiful and manageable indoor plant, adding a touch of lush greenery to your living space.",
        category: "Tropical",
        imageURL:
          "https://media.istockphoto.com/id/1420136042/photo/plant-dwarf-umbrella-tree-schefflera-actinophylla-variegata-kept-indoors.jpg?s=612x612&w=0&k=20&c=dduIVqn9mxJgbNyMZCEbCRwI8CC0TjEc53Cv5Hvirfg=",
      },
    ];

    for (const plant of plantsData) {
      await createPlant(plant);
    }

    console.log("Inserted plants data!");
  } catch (error) {
    console.error(error);
  }
};

const createUsersData = async () => {
  try {
    console.log("Inserting users data...");

    const usersData = [
      {
        firstName: "Tri",
        lastName: "Le",
        username: "trimail@trimail.com",
        password: "plantplaza",
        isAdmin: true,
      },
    ];

    for (const user of usersData) {
      await createUser(user);
    }

    console.log("Finished users data!");
  } catch (error) {
    console.error(error);
  }
};

const createUserPlantsData = async () => {
  try {
    console.log("Inserting list plants data...");

    const userPlantsData = [
      {
        userId: 1,
        plantId: 1,
      },
      {
        userId: 1,
        plantId: 2,
      },
      {
        userId: 1,
        plantId: 3,
      },
    ];

    for (const userPlant of userPlantsData) {
      await addPlantToUser(userPlant);
    }

    console.log("Finished user plants data!");
  } catch (error) {
    console.error(error);
  }
};

const rebuildDB = async () => {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createPlantsData();
    await createUsersData();
    await createUserPlantsData();
  } catch (error) {
    console.error(error);
  }
};

const testDB = async () => {
  try {
    console.log("Checking for plants...");

    const plants = await getPlants();

    console.log("Plants: ", plants);

    console.log("Checking for users...");

    const users = await getUsers();

    console.log("Users: ", users);

    console.log("Checking for user plants...");

    const userPlant = await getUserPlantsByUserId(1);

    console.log("User plants: ", userPlant);
  } catch (error) {
    console.error(error);
  }
};

const runSeed = async () => {
  await rebuildDB();
  await testDB();

  client.end();
};

runSeed();
