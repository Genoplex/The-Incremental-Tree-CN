addLayer('Number',
{
    name          : 'Number',
    symbol        : '<h6>数字</h6>',
    resource      : '无',
    baseResource  : '数字代币',
    baseAmount    :  function()
    {
        return player.points
    },
    color         : '#ffffff',
    type          : 'normal',
    exponent      :  1,
    position      :  1,
    row           :  0,
    requires      :  new Decimal(Infinity),

    resetDescription : '',

    hotkeys : 
    [

    ],

    tooltip :  function()
    {
        return '<h1>你的数字 ↑</h1>'
    },

    tabFormat :
    {
        '主界面':
        {
            unlocked : true,
            content  : function()
            {
                Format = []

                Format.push(['column',[
                                ['display-text',player.Number.Stage_Text],
                                ['bar','Progress'],
                                'blank',
                                ['h-line','900px']],{}])

                Format.push('blank')
                Format.push('blank')
                Format.push('blank')
                
                switch(player.Number.Stage)
                {
                    case 1:
                    case 2:
                    case 3:
                    {
                        Format.push(['row',[
                                        ['column',[
                                            ['column',[
                                                ['display-text','<h1>(↓×' + format(player.Number.Numerator_Multi) + ')</h2>'],],{'height':'50px'}],
                                            ['display-text',player.Number.Numerator_Text],
                                            ['h-line','200px'],
                                            ['display-text',player.Number.Denominator_Text],
                                            ['column',[
                                                ['display-text','<h1>(↑÷' + format(player.Number.Denominator_Multi) + ')</h2>'],],{'height':'50px'}],],{}],
                                        ['display-text','<h1 style="font-size:40px">&nbsp=&nbsp</h1>'],
                                        ['column',[
                                            ['display-text',player.Number.Number_Text]],{'width':'200px'}]],{}])
                    }; break

                    default :
                    {
                        Format.push(['display-text','<h2><br>哦吼！看样子你遇到了一个 BUG。<br><br>请和作者报告这一问题。</h2>'])
                    }
                }

                Format.push('blank')
                Format.push('blank')
                Format.push('blank')

                Format.push(['clickable',1])

                return Format
            }
        },
    },

    microtabs:
    {

    },

    layerShown :  function()
    {
        return true
    },
    
    startData :  function()
    {    
        return{
        unlocked    : true,
		points      : new Decimal(10),
        Stop        : 0,

        Stage       : 1,
        Stage_Text  : '<br>',

        Number            : new Decimal(1),
        Numerator         : new Decimal(1),
        Numerator_Multi   : new Decimal(1),
        Denominator       : new Decimal(1),
        Denominator_Multi : new Decimal(1),

        Number_Text       : [0,'<br>','<br>'],
        Numerator_Text    : [0,'<br>','<br>'],
        Denominator_Text  : [0,'<br>','<br>'],
        }
    },
        
    gainMult :  function()
    {
        mult = new Decimal(1)
        return mult
    },

    gainExp :  function()
    {
        exp = new Decimal(1)
        return exp
    },

    update :  function(diff)
    {
        player.Number.Stage_Text = Change_Stage_Text(player.Number.Stage)

        switch(player.Number.Stage)
        {
            case 1:
            {
                if(player.Number.Number.gte(new Decimal(1e100)))
                {
                    player.Number.Stop = 1
                    player.Numerator.Stop = 1
                    player.Denominator.Stop = 1
                }
            }; break
            case 2:
            {
                if(player.Number.Number.gte(new Decimal('1.79e308')))
                {
                    player.Number.Stop = 1
                    player.Numerator.Stop = 1
                    player.Denominator.Stop = 1
                }
            }; break
            case 3:
            {
                if(player.Number.Number.gte(new Decimal(16).pow(16).pow(1024)))
                {
                    player.Number.Stop = 1
                    player.Numerator.Stop = 1
                    player.Denominator.Stop = 1
                }
            }; break
        }

        if(!player.Number.Stop)
        {
            switch(player.Number.Stage)
            {
                case 1:
                {
                    player.Number.Numerator_Multi   = player.Numerator.Numerator_Multi
                    player.Number.Denominator_Multi = player.Denominator.Denominator_Multi
                    player.Number.Numerator   = player.Number.Numerator  .mul(player.Number.Numerator_Multi  .pow(diff))
                    player.Number.Denominator = player.Number.Denominator.div(player.Number.Denominator_Multi.pow(diff))
                    player.Number.Number = player.Number.Numerator.div(player.Number.Denominator)
                    if(player.Number.Number.gte(1e100))
                    {
                        var Over = player.Number.Number.div(1e100).sqrt()
                        player.Number.Number      = new Decimal(1e100)
                        player.Number.Numerator   = player.Number.Numerator.div(Over)
                        player.Number.Denominator = player.Number.Denominator.mul(Over)
                    }
                    Text_Display_1_2()
                }
                case 2:
                {
                    player.Number.Numerator_Multi   = player.Numerator.Numerator_Multi
                    player.Number.Denominator_Multi = player.Denominator.Denominator_Multi
                    player.Number.Numerator   = player.Number.Numerator  .mul(player.Number.Numerator_Multi  .pow(diff))
                    player.Number.Denominator = player.Number.Denominator.div(player.Number.Denominator_Multi.pow(diff))
                    player.Number.Number = player.Number.Numerator.div(player.Number.Denominator)
                    if(player.Number.Number.gte('1.79e308'))
                    {
                        var Over = player.Number.Number.div('1.79e308').sqrt()
                        player.Number.Number      = new Decimal('1.79e308')
                        player.Number.Numerator   = player.Number.Numerator.div(Over)
                        player.Number.Denominator = player.Number.Denominator.mul(Over)
                    }
                    Text_Display_1_2()
                }; break
                case 3:
                {
                    player.Number.Numerator_Multi   = player.Numerator.Numerator_Multi
                    player.Number.Denominator_Multi = player.Denominator.Denominator_Multi
                    player.Number.Numerator   = player.Number.Numerator  .mul(player.Number.Numerator_Multi  .pow(diff))
                    player.Number.Denominator = player.Number.Denominator.div(player.Number.Denominator_Multi.pow(diff))
                    player.Number.Number = player.Number.Numerator.div(player.Number.Denominator)
                    if(player.Number.Number.gte(new Decimal(16).pow(16).pow(1024)))
                    {
                        var Over = player.Number.Number.div(new Decimal(16).pow(16).pow(1024)).sqrt()
                        player.Number.Number      = new Decimal(new Decimal(16).pow(16).pow(1024))
                        player.Number.Numerator   = player.Number.Numerator.div(Over)
                        player.Number.Denominator = player.Number.Denominator.mul(Over)
                    }
                    Text_Display_3()
                }
                default : break
            }
        }
    },

    doReset :  function(Resetting_Layer)
    {
        var Stage = player.Number.Stage
        switch(Stage)
        {
            case 1:
            case 2:
            {
                layerDataReset('Number')
                layerDataReset('Numerator')
                layerDataReset('Denominator')
            }
        }
        player.Number.Stage = Stage + 1
    },

    milestones :
    {

    },

    bars:
    {
        Progress:
        {
            fillStyle : {'background-color':'green'},
            baseStyle : {'background-color':'rgb(0,0,0,0)'},
            textStyle : {'color':'white'},
            direction : RIGHT,
            width     : 550,
            height    : 25,
            progress  : function()
            {
                switch(player.Number.Stage)
                {
                    case 1: return player.Number.Number.log(10).div(100)                            ; break
                    case 2: return player.Number.Number.log(10).div(new Decimal('1.79e308').log(10)); break
                    case 3: return player.Number.Number.log(10).div(new Decimal(16).pow(16).pow(1024).log(10))      ; break
                }
            },
            display   : function()
            {
                switch(player.Number.Stage)
                {
                    case 1: return format(player.Number.Number.log(10)) + '%'                                              ; break
                    case 2: return format(player.Number.Number.log(10).div(new Decimal('1.79e308').log(10)).mul(100)) + '%'; break
                    case 3: return format(player.Number.Number.log(10).div(new Decimal(16).pow(16).pow(1024).log(10)).mul(100)) + '%'                                     ; break
                }
            },
        }
    },

    clickables : (()=>
    {
        var Clickables = {}
        Clickables[1] = {}
        Clickables[1].title = function()
        {
            switch(player.Number.Stage)
            {
                case 1:
                {
                    var Title = '<h2>完成阶段 1</h2>'
                    var Description = '<br>你会获得<br>-------------------------------------------<br>1. 清除进度，但是提高阶段<br>2. 重置分子，但是分子解锁新界面<br>3. 重置分母，但是分母解锁新界面'
                    return Title + '<br>' + Description
                }
                case 2:
                {
                    var Title = '<h2>完成阶段 2</h2>'
                    var Description = '<br>你会获得<br>-------------------------------------------<br>1. 清除进度，但是提高阶段<br>2. 重置分子，但是分子获得新的升级<br>3. 重置分母，但是分母获得新的升级<br>4. 解锁一个新层级'
                    return Title + '<br>' + Description
                }
                case 3:
                {
                    var Title = '<h2>完成阶段 3</h2>'
                    var Description = '<br>嘿！你已经抵达了 Demo 版本的终点<br><br>干的漂亮<br><br>查看更新日志来了解未来更新方向和其他信息'
                    return Title + '<br>' + Description
                }
            }
        }
        Clickables[1].unlocked = function()
        {
            switch(player.Number.Stage)
            {
                case 1: return player.Number.Number.gte(1e100)
                case 2: return player.Number.Number.gte(1e308)
                case 3: return player.Number.Number.gte(new Decimal(16).pow(16).pow(1024))
            }
        }
        Clickables[1].canClick = function()
        {
            return player.Number.Stage<3
        }
        Clickables[1].onClick = function()
        {
            doReset(this.layer,true)
        }
        Clickables[1].style = function()
        {
            Style = {}
            Style['width']                = '550px'
            Style['height']               = '200px'
            Style['border']               = '3px solid #666666'
            Style['border-radius']        = '25px'
            Style['color']                = 'black'
            Style['background-color']     = 'white'
            return Style
        }

        return Clickables
    })()
})

function Change_Stage_Text(Stage)
{
      switch(Stage)
      {
        case 1  : 
        {
            var Title = '<h1>- 阶段 1 -</h1>'
            var Lore  = '<h3><font style="color:gray"><i>———— 大数， 一种超越人类想象的概念。</i></font></h3>'
            var Goal  = '<h2>目标：达到 10<sup>100</sup>'
            var Progress = '<h4><font style="color:gray">（以对数显示）</font></h4>'
            return Title + '<br><br>' + Lore + '<br><br>' + Goal + '<br><br>' + Progress
        }; break
        case 2  :
        {
            var Title = '<h1>- 阶段 2 -</h1>'
            var Lore  = '<h3><font style="color:gray"><i>———— 硬件拓展上限。</i></font></h3>'
            var Goal  = '<h2>目标：达到 1.79×10<sup>308</sup>'
            var Progress = '<h4><font style="color:gray">（以对数显示）</font></h4>'
            return Title + '<br><br>' + Lore + '<br><br>' + Goal + '<br><br>' + Progress
        }
        case 3  :
        {
            var Title = '<h1>- 阶段 3 -</h1>'
            var Lore  = '<h3><font style="color:gray"><i>———— ["此处等待填写（这是个占位符）"]</i></font></h3>'
            var Goal  = '<h2>目标：达到 16<sup>16×1024</sup></sup> ≈ 10<sup>19728.3</sup></sup>'
            var Progress = '<h4><font style="color:gray">（以对数显示）</font></h4>'
            return Title + '<br><br>' + Lore + '<br><br>' + Goal + '<br><br>' + Progress
        }
        default :
        {
            var Title = '<h1>- 阶段 ? -</h1>'
            var Lore  = '<h3><font style="color:gray"><i>———— Wait, What?</i></font></h3>'
            var Goal  = '<h2>目标：达到 -1'
            return Title + '<br><br>' + Lore + '<br><br>' + Goal + '<br><br>'
        }
      }
}

function Text_Display_1_2()
{
    var Numerator_Power  = new Decimal(player.Number.Numerator.log(10).floor())
    var Numerator_Number = new Decimal(player.Number.Numerator.div(new Decimal(10).pow(Numerator_Power)))
    player.Number.Numerator_Text = '<h1 style="font-size:40px">' + format(Numerator_Number) + '×10<sup>' + formatWhole(Numerator_Power) + '</sup></h1>'

    var Denominator_Power  = new Decimal(player.Number.Denominator.log(10).ceil())
    var Denominator_Number = new Decimal(player.Number.Denominator.mul(new Decimal(10).pow(Denominator_Power.mul(-1))))
    player.Number.Denominator_Text = '<h1 style="font-size:40px">' + format(Denominator_Number) + '×10<sup>' + formatWhole(Denominator_Power) + '</sup></h1>'

    var Number_Power  = new Decimal(player.Number.Number.log(10).floor())
    var Number_Number = new Decimal(player.Number.Number.div(new Decimal(10).pow(Number_Power)))
    player.Number.Number_Text = '<h1 style="font-size:40px">' + format(Number_Number) + '×10<sup>' + formatWhole(Number_Power) + '</sup></h1>'
}

function Text_Display_3()
{
    var Numerator_Power = new Decimal(player.Number.Numerator.log(10))
    if(Numerator_Power.lt(10))
    {
        Numerator_Power = Numerator_Power.floor()
        var Numerator_Number = new Decimal(player.Number.Numerator.div(new Decimal(10).pow(Numerator_Power)))
        player.Number.Numerator_Text = '<h1 style="font-size:40px">' + format(Numerator_Number) + '×10<sup>' + formatWhole(Numerator_Power) + '</sup></h1>'
    }
    else player.Number.Numerator_Text = '<h1 style="font-size:40px">10<sup>10×' + format(Numerator_Power.div(10)) + '</sup>'

    var Denominator_Power = new Decimal(player.Number.Denominator.log(10))
    if(Denominator_Power.gt(-10))
    {
        Denominator_Power = Denominator_Power.ceil()
        var Denominator_Number = new Decimal(player.Number.Denominator.mul(new Decimal(10).pow(Denominator_Power.mul(-1))))
        player.Number.Denominator_Text = '<h1 style="font-size:40px">' + format(Denominator_Number) + '×10<sup>' + formatWhole(Denominator_Power) + '</sup></h1>'
    }
    else player.Number.Denominator_Text = '<h1 style="font-size:40px">10<sup>10×' + format(Denominator_Power.div(10)) + '</sup>'

    var Number_Power = new Decimal(player.Number.Number.log(10))
    if(Number_Power.lt(10))
    {
        Number_Power = Number_Power.floor()
        var Numerator_Number = new Decimal(player.Number.Numerator.div(new Decimal(10).pow(Numerator_Power)))
        player.Number.Number_Text = '<h1 style="font-size:40px">' + format(Numerator_Number) + '×10<sup>' + formatWhole(Numerator_Power) + '</sup></h1>'
    }
    else player.Number.Number_Text = '<h1 style="font-size:40px">10<sup>10×' + format(Number_Power.div(10)) + '</sup>'
}
