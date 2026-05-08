export const animals = [
  {
    id: 1,
    name: 'Red Fox',
    type: 'animal',
    image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'A cunning and adaptable creature, the red fox thrives in forest edges.',
  },
  {
    id: 2,
    name: 'White-tailed Deer',
    type: 'animal',
    image:  './white tail deer.jpg',
    description: 'Graceful and alert, these deer are common in North American woodlands.',
  },
  {
    id: 3,
    name: 'Gray Wolf',
    type: 'animal',
    image:  './gray wolf.jpg',
    description: 'The iconic pack hunter, symbol of wilderness and freedom.',
  },
  {
    id: 4,
    name: 'Black Bear',
    type: 'animal',
    image: './Black Bear.jpg',
    description: 'A powerful omnivore that roams extensive forest territories.',
  },
  {
    id: 5,
    name: 'European Badger',
    type: 'animal',
    image: './European Badger.jpg',
    description: 'A nocturnal digger, creating elaborate underground setts.',
  },
  {
    id: 6,
    name: 'Eastern Chipmunk',
    type: 'animal',
    image: './Eastern Chipmunk.jpg',
    description: 'A tiny striped rodent that scurries across the forest floor.',
  },
];

export const birds = [
  {
    id: 7,
    name: 'Great Horned Owl',
    type: 'bird',
    image:  './reat horned owl.jpg',
    description: 'Silent nocturnal hunter with piercing yellow eyes.',
  },
  {
    id: 8,
    name: 'Scarlet Macaw',
    type: 'bird',
    image: './Scarlet Macaw.jpg',
    description: 'A vibrant parrot of tropical rainforests, known for its intelligence.',
  },
  {
    id: 9,
    name: 'European Robin',
    type: 'bird',
    image: './European Robin.jpg',
    description: 'A small friendly bird that often accompanies gardeners.',
  },
  {
    id: 10,
    name: 'Blue Jay',
    type: 'bird',
    image: './Blue Jay.jpg',
    description: 'A bold and intelligent corvid with striking blue plumage.',
  },
  {
    id: 11,
    name: 'Pileated Woodpecker',
    type: 'bird',
    image: './Pileated Woodpecker.jpg',
    description: 'A large woodpecker that drums on dead trees in search of insects.',
  },
  {
    id: 12,
    name: 'Ruby-throated Hummingbird',
    type: 'bird',
    image: './Ruby-throated Hummingbird.jpg',
    description: 'A tiny jewel-like bird that hovers effortlessly while feeding.',
  },
];

export const plants = [
  {
    id: 13,
    name: 'Fern',
    type: 'plant',
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Ancient plants that create a lush undergrowth in damp forests.',
  },
  {
    id: 14,
    name: 'Oak Tree',
    type: 'plant',
    image: './Oak Tree.jpg',
    description: 'The mighty oak, a keystone species supporting countless creatures.',
  },
  {
    id: 15,
    name: 'Mushroom',
    type: 'plant',
    image: ' ./Mushroom.jpg',
    description: 'Fungi that recycle nutrients and connect trees through mycelium networks.',
  },
  {
    id: 16,
    name: 'Moss',
    type: 'plant',
    image: './Moss.jpg',
    description: 'Soft green carpets that hold moisture and prevent erosion.',
  },
  {
    id: 17,
    name: 'Wild Rose',
    type: 'plant',
    image: './Wild Rose.jpg',
    description: 'A thorny shrub with fragrant blossoms, loved by pollinators.',
  },
  {
    id: 18,
    name: 'Birch Tree',
    type: 'plant',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'A graceful tree with distinctive paper-like bark.',
  },
];

export const allItems = [...animals, ...birds, ...plants];