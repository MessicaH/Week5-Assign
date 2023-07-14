/* Create a menu to add new PCs to an Adventuring Group for a D&D campaign for a DM that has multiple parties who play each week or month, 
similar to Week 5's lesson on OOP and Menu Apps */


class Player {
    constructor(pcName, pcRace, pcClass) {
    this.pcName = pcName;
    this.pcRace = pcRace;
    this.pcClass = pcClass;
    }
    
    describe() {
    //console.log(`${this.pcName} is a ${this.pcRace} ${this.pcClass}`)
    return `${this.pcName} is a ${this.pcRace} ${this.pcClass}`;
    }
    }
    class Group {
    constructor(groupName) {
    this.groupName = groupName;
    this.players = []; //List of all players currently part of the party or adventuring group.
    }
    
    addPlayer(player) {
    if (player instanceof Player) {
    this.players.push(player);
    } else {
    throw new Error(`You can only add a new Player to your party. 
    What you typed is not an approved input: ${player}`);
    }
    }
    
    describe() {
    return `${this.groupName} currently has ${this.players.length} party members.`;
    }
    }

    // what drives the application and user choices
    class Menu {
    constructor() {
    this.groups = [];
    this.selectedGroup = null; // manage one adventuring group at a time
    }
    
    // entry point to application
    start() {
    let selection = this.showMainMenuOptions(); 
    while (selection != 0) {
    switch(selection) {
    case '1' :
    this.createGroup();
    break;
    case '2' :
    this.viewGroup();
    break;
    case '3' :
    this.deleteGroup();
    break;
    case '4' :
    this.displayGroups();
    break;
    default:
    selection = 0;
    }
    selection = this.showMainMenuOptions();
    }
    alert("See you next session!");
    }
    
    
    showMainMenuOptions() {
    return prompt(`
    0) Exit
    1) Create a new adventuring group
    2) View your adventuring group(s)
    3) Delete an adventuring group
    4) Display all adventuring groups
    `);
    }
    
    showGroupMenuOptions(groupInfo) {
    return prompt(`
    0) Exit
    1) Add a new player (PC) to your party.
    2) Delete a player (PC) from your party.
    -----------------
    ${groupInfo}
    `);
    }
    
    displayGroups() {
    let groupString = '';
    for (let i = 0; i < this.groups.length; i++) {
    groupString += i+ ') ' + this.groups[i].groupName + '\n';
    }
    alert(groupString);
    }
    
    createGroup() {
    let name = prompt("Enter a name for your new Adventuring Group: ");
    this.groups.push(new Group(name));
    }
    
    viewGroup() {
    let index = prompt("Enter the number (index) of the adventuring group that you would like to view:");
    if (index > -1 && index < this.groups.length) {
    this.selectedGroup = this.groups[index];
    
    let description = "Adventuring Group Name: " + this.selectedGroup.groupName + "\n";
    description += " " + this.selectedGroup.describe() + "\n";
    for (let i = 0; i < this.selectedGroup.players.length; i++) {
    
        /* What does the current roster look like and what race+class abilities does each player contribute?
         description += i + ') ' + this.selectedGroup.players[i].name + ' - '
        + this.selectedGroup.players[i].pcRace + " " + this.selectedGroup.players[i].pcClass + '\n'; */
        description += i + ") " + this.selectedGroup.players[i].describe() + "\n";
    }

    let selection1 = this.showGroupMenuOptions(description);
    switch (selection1) {
    case '1' :
    this.createPlayer();
    break;
    case '2' :
    this.deletePlayer();
    }
    } // validates user input or selection in menu
    }
    
    deleteGroup() {
    let index = prompt("Enter the number (index) of the adventuring group that you wish to delete: ");
    if (index > -1 && index < this.groups.length) {
    this.groups.splice(index,1);
    }
    }
    
    
    createPlayer() {
    let pcName = prompt("Enter a name for your new player (PC): ");
    let pcRace = prompt(`Enter the race (origin) of your new player: 
        1) Human
        2) Dwarf
        3) Elf
        4) Half-Elf
        5) Gnome
        6) Half-Orc
        7) Halfling
     `);
    let pcClass = prompt(`Enter the class for your new player:
        1) Bard
        2) Fighter
        3) Sorcerer
        4) Druid
        5) Ranger
    `);
/* Had a bit of a snafu with ^^ where the Player Class list wasn't rendering as displayed text, but realized that backticks `` needed to do
 multiple lines as part of the prompt. 
 
 Ideally these two entries for Race and Class would later be converted into buttons for selection, not rely on typed user input! */


    //this.selectedGroup.players.push(new Player(pcName, pcRace, pcClass));
    this.selectedGroup.addPlayer(new Player(pcName, pcRace, pcClass));
    }
    
    deletePlayer() {
    let index = prompt('Enter the roster number (index) of the player that you wish to delete: ');
    if (index > -1 && index < this.selectedGroup.players.length) { this.selectedGroup.players.splice(index,1);
    }
    }
    }
    let menu = new Menu();
    menu.start();
    
    