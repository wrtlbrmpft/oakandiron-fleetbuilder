const allShips = [
  {
    name: "Sloop",
    class: "Unrated",
    cost: 7,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 2 },
      { name: "Additional Guns", cost: 2 },
      { name: "Sweeps", cost: 1 },
      { name: "Swift", cost: 1 }
    ]
  },
  {
    name: "Corvette",
    class: "Unrated",
    cost: 7,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 2 },
      { name: "Additional Guns", cost: 2 },
      { name: "Sweeps", cost: 1 },
      { name: "Swift", cost: 1 }
    ]
  },
  {
    name: "Brigantine",
    class: "Unrated",
    cost: 8,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 2 },
      { name: "Additional Guns", cost: 2 },
      { name: "Sweeps", cost: 1 },
      { name: "Swift", cost: 1 },
      { name: "Weatherly", cost: 2 }
    ]
  },
  {
    name: "Fluyt",
    class: "Unrated",
    cost: 11,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 2 },
      { name: "Additional Guns", cost: 2 },
      { name: "Stout", cost: 4 }
    ]
  },
  {
    name: "Petite Fregate",
    class: "Unrated",
    cost: 13,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 4 },
      { name: "Additional Guns", cost: 2 },
      { name: "Sweeps", cost: 1 },
      { name: "Weatherly", cost: 2 }
    ]
  },
  {
    name: "Light Galleon",
    class: "Unrated",
    cost: 17,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 6 },
      { name: "Additional Guns", cost: 2 },
      { name: "Stout", cost: 6 },
      { name: "Weatherly", cost: 2 }
    ]
  },
  {
    name: "Sixth Rate",
    class: "Unrated",
    cost: 13,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 4 },
      { name: "Additional Guns", cost: 2 },
      { name: "Stout", cost: 4 },
      { name: "Swift", cost: 1 },
      { name: "Weatherly", cost: 2 }
    ]
  },
  {
    name: "Fifth Rate",
    class: "Unrated",
    cost: 16,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 4 },
      { name: "Additional Guns", cost: 2 },
      { name: "Stout", cost: 4 },
      { name: "Swift", cost: 1 },
      { name: "Weatherly", cost: 2 }
    ]
  },
  {
    name: "Fourth Rate",
    class: "Ship of the Line",
    cost: 23,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 6 },
      { name: "Additional Guns", cost: 2 },
      { name: "Stout", cost: 6 },
      { name: "Swift", cost: 1 },
      { name: "Weatherly", cost: 2 }
    ]
  },
  {
    name: "Third Rate",
    class: "Ship of the Line",
    cost: 37,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 8 },
      { name: "Additional Guns", cost: 6 },
      { name: "Stout", cost: 6 },
      { name: "Swift", cost: 1 }
    ]
  },
  {
    name: "Second Rate",
    class: "Ship of the Line",
    cost: 55,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 8 },
      { name: "Additional Guns", cost: 2 },
      { name: "Stout", cost: 8 },
      { name: "Swift", cost: 1 },
      { name: "Weatherly", cost: 2 }
    ]
  },
  {
    name: "First Rate",
    class: "Ship of the Line",
    cost: 58,
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
      { name: "Additional Crew", cost: 8 },
      { name: "Additional Guns", cost: 2 },
      { name: "Stout", cost: 8 },
      { name: "Swift", cost: 1 },
      { name: "Weatherly", cost: 2 }
    ]
  },
  {
    name: "Revenge",
    class: "Pirate",
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
    ]
  },
  {
    name: "Queen Anne's Revenge",
    class: "Pirate",
    upgrades: [
      { name: "Skill 1", cost: 2 },
      { name: "Skill 2", cost: 4 },
    ]
  }
];

const Ships = {
  forFactionAndAdmiral: function (faction, admiral) {

    if (faction === "English" || faction === "Dutch") {
      return allShips.filter(ship => ship.class !== "Pirate");
    }
    else if (faction === "French") {
      var frenchShips = allShips.filter(ship => ship.class !== "Pirate");

      frenchShips.forEach(ship => {
        ship.upgrades.forEach(upgrade => {
          if (upgrade.name === "Swift" || upgrade.name === "Weatherly") {
            if (upgrade.cost > 0) {
              upgrade.cost = (upgrade.cost - 1);
            }
          }
          if (upgrade.name === "Additional Guns") {
            if (upgrade.cost > 1)
              upgrade.cost = (upgrade.cost - 1);
          }
        })
      });

      return frenchShips;
    }
    else if (faction === "Spanish") {
      var spanishShips = allShips.filter(ship => ship.class !== "Pirate");

      spanishShips.forEach(ship => {
        ship.upgrades.forEach(upgrade => {
          if (upgrade.name === "Stout")
            upgrade.cost = Math.floor(upgrade.cost / 2);
        })
      });

      return spanishShips;
    }
    else if (faction === "Pirate") {
      var pirateShips = allShips.filter(ship => ship.class !== "Ship of the Line");

      pirateShips.forEach(ship => {
        ship.upgrades.forEach(upgrade => {
          if (upgrade.name === "Additional Crew")
            upgrade.cost = Math.floor(upgrade.cost / 2);
        })
      });

      return pirateShips;
    }
    else
      return [];
  }
};

export default Ships;