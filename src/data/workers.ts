export const workersTable = [
  {
    name: "Samy",
    availablity: {
      from: new Date(),
      to: (() => {
        let date = new Date();
        date.setHours(24);
        return date;
      })(),
    },
  },
  {
    name: "Alex",
    availablity: {
      from: new Date(),
      to: (() => {
        let date = new Date();
        date.setHours(24 * 7 * 30);
        return date;
      })(),
    },
  },
  {
    name: "Chris",
    availablity: {
      from: new Date(),
      to: (() => {
        let date = new Date();
        date.setHours(24 * 7 * 30);
        return date;
      })(),
    },
  },
];
