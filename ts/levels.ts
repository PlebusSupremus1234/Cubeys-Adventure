export let levels = [
    {
        map: [
            ".....................................t................",
            ".....P................................................",
            "............t.......................................p.",
            "......................................gggggggggggggggg",
            "..........................gggggggggggg................",
            "ggggggggggggggggggggggg..............................."
        ],
        txt: [
            "Touch the portal to continue to the next level",
            "Use the arrow keys to move Cubey"
        ]
    },
    {
        map: [
            ".......P.....................................................",
            "...............t.............................................",
            "........................ggggg...........................s.p.ss",
            "......................................ss.......sss.....ggggggg",
            ".............ssss.................gggggg......sggg.....#######",
            "gggggggggggggggggggggggg..........######ggggggg###ggggg#######",
            "########################..........############################"
        ],
        txt: [
            "Don't touch the spikes!"
        ]
    },
    {
        map: [
            "...P...................................................g............",
            "..........t.......................................g...........s...p.",
            "..............................................g..........ggggggggggg",
            "................s.............................#LLLLLLLLLL###########",
            "ggggggggg.....gggggggggg....g.....g.....gggggg#llllllllll###########",
            "#########LLLLL##########LLLL#LLLLL#LLLLL#######llllllllll###########",
            "#########lllll##########llll#lllll#lllll############################",
            "####################################################################"
        ],
        txt: [
            "Uh oh, lava... that can't be good"
        ]
    }
];

/*
    . = air
    g = ground
    # = soil
    s = spikes
    l = lava
    L = lava with yellow grad
    i = ice
    t = text
    p = portal
    P = player    
*/

export function updateLevel(l: number, t: number) {
    let data = JSON.parse(localStorage.getItem("levels"));
    data[l - 1].completed = true;
    data[l - 1].time = data[l - 1].time && data[l - 1].time !== 0 ? Math.min(data[l - 1].time, t) : t;
    if (data[l]) data[l].unlocked = true;
    localStorage.setItem("levels", JSON.stringify(data));
}