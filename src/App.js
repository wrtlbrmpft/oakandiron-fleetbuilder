import React, { useState, useEffect } from 'react';
import 'App.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Divider,
  Button,
  InputLabel,
  Grid,
  Toolbar,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Admirals from 'data/admirals';
import { factions } from 'data/factions';
import { gameModes } from 'data/gameModes';
import { grey } from '@material-ui/core/colors';
import ShipSelector from 'Components/ShipSelector';
import InitiativecardSelector from 'Components/InitiativeCardSelector';
import Ship from 'Components/Ship.js';
import { AppBar } from '@material-ui/core';

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    sectionContainer: {
      backgroundColor: grey[200],
      padding: theme.spacing(2),
    },
    sectionHeader: {
      margin: theme.spacing(2),
      marginBottom: 0,
    },
    sectionSubHeader: {
      margin: theme.spacing(2),
      marginTop: 0,
    },
    addButton: {
      margin: theme.spacing(2),
    },
    costLabel: {
      margin: theme.spacing(1),
    },
    divider: {
      color: '#000000',
    },
    scrollableContainer: {
      'overflow-y': 'auto',
    },
    title: {
      flexGrow: 1,
    },
    topForm: {
      margin: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const [selectedFaction, setSelectedFaction] = useState('');
  const [selectedGameMode, setSelectedGameMode] = useState('');
  const [selectedAdmiral, setSelectedAdmiral] = useState('');
  const [availableAdmirals, setAvailableAdmirals] = useState([]);
  const [selectedShips, setSelectedShips] = useState([]);
  const [shipSelectorIsOpen, setShipSelectorIsOpen] = useState(false);
  const [
    initiativeCardSelectorIsOpen,
    setInitiativeCardSelectorIsOpen,
  ] = useState(false);
  const [selectedInitiativeCards, setSelectedInitiativeCards] = useState([]);
  const [cost, setCost] = useState(0);
  const [shipIdCounter, setShipIdCounter] = useState(0);

  useEffect(() => {
    /*Update available admirals*/
    if (selectedFaction) {
      const admiralsInFaction = Admirals.allowed(selectedFaction);
      setAvailableAdmirals(admiralsInFaction);
    }
  }, [selectedFaction, selectedAdmiral, selectedGameMode]);

  useEffect(() => {
    setSelectedShips([]);
    setSelectedInitiativeCards([]);
  }, [selectedFaction]);

  useEffect(() => {
    setSelectedInitiativeCards([]);
  }, [selectedAdmiral]);

  useEffect(() => {
    // Calculate cost
    if (selectedGameMode && selectedFaction && selectedGameMode) {
      let newCost = 0;
      newCost = newCost + selectedAdmiral.cost;

      selectedShips.forEach((ship) => {
        newCost = newCost + ship.costIncludingUpgrades;
      });

      setCost(newCost);
    }
  }, [selectedAdmiral.cost, selectedFaction, selectedGameMode, selectedShips]);

  const handleGameModeChange = (event) => {
    setSelectedGameMode(event.target.value);
  };

  const handleFactionChange = (event) => {
    setSelectedFaction(event.target.value);
  };

  const handleAdmiralChange = (event) => {
    setSelectedAdmiral(event.target.value);
  };

  const handleRemoveShip = (shipToRemove) => {
    const newSelectionOfShips = selectedShips.filter(
      (ship) => ship.id !== shipToRemove.id
    );
    setSelectedShips(newSelectionOfShips);
  };

  const handleInitiativeCardSelectorFlowDone = (initiativecards) => {
    console.log(initiativecards);
    setInitiativeCardSelectorIsOpen(false);
    setSelectedInitiativeCards(initiativecards);
  };

  const handleShipSelectorFlowDone = (shipToAdd) => {
    setShipSelectorIsOpen(false);

    if (!shipToAdd) return;

    shipToAdd.id = shipIdCounter;
    shipToAdd.id++;
    setShipIdCounter(shipToAdd.id);

    const newSelectionOfShips = selectedShips;
    newSelectionOfShips.push(shipToAdd);
    setSelectedShips(newSelectionOfShips);
  };

  const handleOpenShipSelector = () => {
    setShipSelectorIsOpen(true);
  };

  const handleOpenInitiativeCardSelector = () => {
    setInitiativeCardSelectorIsOpen(true);
  };

  const handleShipCostUpdated = (shipId, newCost) => {
    const updatedListOfSelectedShips = selectedShips.map((ship) => {
      if (ship.id === shipId) ship.costIncludingUpgrades = newCost;

      return ship;
    });

    setSelectedShips(updatedListOfSelectedShips);
  };

  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Oak And Iron Fleetbuilder
          </Typography>

          {selectedGameMode ? (
            <h3 className={classes.costLabel}>
              {'Fleet Cost: ' + cost + '/' + selectedGameMode.maxPoints}
            </h3>
          ) : (
            <h3 className={classes.costLabel}>{'Fleet Cost: 0/0'}</h3>
          )}
        </Toolbar>
      </AppBar>

      <Grid className={classes.topForm} container>
        <FormControl className={classes.formControl}>
          <InputLabel>Choose Game Mode</InputLabel>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            label='Select Game Mode'
            value={selectedGameMode}
            onChange={handleGameModeChange}
          >
            {gameModes.map((gameMode) => (
              <MenuItem key={gameMode.name} value={gameMode}>
                {gameMode.name + ' (' + gameMode.maxPoints + ' Points)'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Choose Faction</InputLabel>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            label='Choose a faction'
            onChange={handleFactionChange}
            value={selectedFaction}
          >
            {factions.map((faction) => (
              <MenuItem key={faction.type} value={faction}>
                {faction.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Choose Admiral</InputLabel>
          <Select
            displayEmpty
            className={classes.selectEmpty}
            label='Select Admiral'
            disabled={!selectedFaction}
            value={selectedAdmiral}
            onChange={handleAdmiralChange}
          >
            {availableAdmirals.map((admiral) => (
              <MenuItem key={admiral.name} value={admiral}>
                {admiral.name + ' (+' + admiral.cost + ')'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Divider />

      {/* initiative cards*/}
      <Grid
        className={classes.sectionContainer}
        container
        spacing={2}
        direction='column'
        alignItems='flex-start'
      >
        <Typography className={classes.sectionHeader} variant='h5'>
          List of Ships
        </Typography>
        <Typography className={classes.sectionSubHeader} variant='h7'>
          {selectedGameMode
            ? ' ( min: ' +
              selectedGameMode.minShips +
              ' max: ' +
              selectedGameMode.maxShips +
              ')'
            : null}
        </Typography>
        {selectedShips.map((ship) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Ship
              ship={ship}
              faction={selectedFaction}
              removeShip={handleRemoveShip}
              costUpdated={handleShipCostUpdated}
            />
          </Grid>
        ))}
        <Button
          className={classes.addButton}
          variant='containedPrimary'
          onClick={handleOpenShipSelector}
          disabled={!selectedFaction || !selectedGameMode || !selectedAdmiral}
        >
          Add Ship
        </Button>
        <ShipSelector
          open={shipSelectorIsOpen}
          faction={selectedFaction}
          admiral={selectedAdmiral}
          gameMode={selectedGameMode}
          onClose={handleShipSelectorFlowDone}
        />
      </Grid>

      <Divider />
      {/* initiative cards*/}
      <Grid
        className={classes.sectionContainer}
        container
        spacing={2}
        direction='column'
        alignItems='flex-start'
      >
        <Typography className={classes.sectionHeader} variant='h5'>
          Initiative Cards
        </Typography>
        <List>
          {selectedInitiativeCards.map((card) => (
            <ListItem>
              <ListItemText
                primary={
                  card.name +
                  ' (' +
                  card.initiativeValue +
                  ') [' +
                  card.faction +
                  ']'
                }
              />
            </ListItem>
          ))}
        </List>
        <Button
          className={classes.addButton}
          variant='containedPrimary'
          onClick={handleOpenInitiativeCardSelector}
          disabled={!selectedFaction || !selectedGameMode || !selectedAdmiral}
        >
          Choose Initiative Cards
        </Button>
        <InitiativecardSelector
          open={initiativeCardSelectorIsOpen}
          faction={selectedFaction}
          admiral={selectedAdmiral}
          onClose={handleInitiativeCardSelectorFlowDone}
        />
      </Grid>
    </div>
  );
}

export default App;
