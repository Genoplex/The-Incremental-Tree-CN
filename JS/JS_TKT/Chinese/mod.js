let modInfo = {
	name        : '增量树',
	id          : 'GenoplexsTKT',
	author      : 'Genoplex',
	thanks      : '匿_名',
	pointsName  : '',
	discordName : '',
	discordLink : '',
	initialStartPoints: new Decimal (10),
	offlineLimit: 0,
}

// Set your version in num and name
let VERSION = {
	num: 'ersion a.0.1 Demo',
	name: '',
}

let changelog =   
`
<h1> ！ 未来更新内容 ！ </h1><br>
<br>
<h2>*全新的层级和阶段*<br><h3>不一样的数字增加方法<br><br>
<h2>*数字和无限层级的机制拓展*<br><h3>自由地选择你的重置路径<br><br>
<h2>*挑  战*<br><h3>为了增益和 Qol！<br><br><br>
<h2>*以及*<br><h3>- 成就进度 -<br>- 小游戏 -<br>- 其他内容 -<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<h2> - Version a.0.1 Demo -</h2><br>
<br><h3>
· 四个全新层级和三个阶段的可玩内容<br>

`
	

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function()
	{
		switch(player.Number.Stage)
		{
			case 1:
			case 2: 
			case 3: return '<br><h3>你的数字达到了 ' + player.Number.Number_Text; break
		}
	},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}