// skills's names match pictures's names
export const skills = ['React','Expo', 'Nodejs', 'Mongoose', 'MongoDB', 'Flutter', 'MySQL', 'JavaScript', 'cpp', 'DotNet'];
export const projects = [
    {
        name: 'WitcherJDR', 
        description: `Projet de feuille de Personnage automatique pour le jeu de role The witcher.
                        Framework non possible car il devait être utilisé hors ligne avec un public non averti (Pas de commandes ou manipulation complexe).
                        Serveur et base de donnée en serveur privé (physique local) uniquement pour sauvegarder les personnages.
                        `,
        link: "https://github.com/YannVerd/Witcher-CharacterSheet"
    },
    {
        name: 'CPPFW',
        description: `Il s'agit d'un framework réalisé en C++ pour créer des sites statiques en html/css `,
        link: "https://github.com/YannVerd/CPPFW"
    },
    {
        name: "pizza_app",
        description:"Projet d'école pour une application de livraison de pizza en flutter",
        link:'https://github.com/YannVerd/pizza_app'
    },
    {
        name: "Conectim",
        description: "Mon stage dans la Start-up éponyme qui m'a permit de développer, entre autres, une messagerie dans un évènement et la programmation d'évènements récurrents",
        link: "https://conectim.fr/",
    }

]
export const links = [
    {name: "GitHub", img:"/github-50.png", imgWhite:"/github-white-50.png", link: "https://github.com/YannVerd"}, 
    {name: "LinkedIn", img:"/linkedin-50.png",imgWhite:"/linkedin-white-50.png", link: "https://www.linkedin.com/in/yann-verdier-a7b457271/"}, 
    {name: "CV", img:"/cv-50.png", imgWhite:"/cv-white-50.png", link: "#"}
];
export const sections = [{name: "Compétences" , id: "skillsSection"}, {name: "Projets" , id: "projectsSection"} ];

export const gameObjectType = {
    virus: "virus",
    shoot: "shoot"
}

export const difficulties = [
    {name:"very easy", reach: true},
    {name:"easy", reach: false},
    {name:"normal", reach: false},
    {name:"hard", reach: false},
    {name:"very hard", reach: false},
    {name:"insane", reach: false},
    {name:"impossible", reach: false},
    {name:"mouahahahahahah", reach: false}
]

    