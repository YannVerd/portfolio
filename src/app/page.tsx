'use client';
import React from "react";
import Header from "@/app/components/header";
import Skill from "./components/skill";
import Project from "./components/project";
import LegalNotices from "./components/legalNotices";
import Image from "next/image";
import CVModal from "./components/cvModal";

export default function Home() {
  const [legalNotices, setLegalNotices] = React.useState(false);
  const [showCV, setShowCV] = React.useState(false);

  const handlingModal = (type: string) => {
    if(type == 'CV'){
      setShowCV(!showCV);
      showCV ? document.documentElement.style.overflow = "" : document.documentElement.style.overflow = "hidden";
    }else{
      setLegalNotices(!legalNotices);
      legalNotices ? document.documentElement.style.overflow = "" : document.documentElement.style.overflow = "hidden";

    }
    
  }

   const skills = ['React','Expo', 'Nodejs', 'Mongoose', 'MongoDB', 'Flutter', 'MySQL', 'JavaScript', 'cpp'];
   const projects = [
    {
      name: 'WitcherJDR', 
      description: `Projet qui consite à réaliser une feuille de personnage automatisée pour le jeu de rôle papier dans l'univers de The Witcher.
                    Il s'agit d'une application simplifiée pour un usage privée entre amis.\n
                    Elle fonctionne avec un server nodejs/express (API) et une bdd nosql mongodb sur serveur privé (visible sur le git)\n
                    L'absence de framework côté front s'explique par la nécessité d'être lancé sans ligne de commande ou une installation.\n
                    Seul le système de sauvegarde des personnages est géré par l'API et la base de données. Tout le reste est en local.\n
                    Plus de détails dans le readme
                    `,
      link: "https://github.com/YannVerd/Witcher-CharacterSheet"
    },
    {
      name: 'CPPFW',
      description: `Il s'agit d'un framework réalisé en C++ pour créer des sites statiques en html/css `,
      link: "https://github.com/YannVerd/CPPFW"
    } 
  ]

  return (
    <>
      <Header hook={handlingModal}/>
      <main className="md:w-[95%] w-full flex flex-col justify-between items-center mt-24 mb-20">
        <CVModal isVisible={showCV} hook={(handlingModal)}/>
        <section id="presentationSection" className="flex w-full md:w-[80%] flex-wrap justify-between items-center mb-12">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-secondary font-bold text-4xl md:text-6xl  dark:text-white">Bienvenue sur mon Portfolio</h1>
            <div className="flex items-center w-fit space-x-2">
              <h3 className="text-2xl font-mono overflow-hidden whitespace-nowrap animate-typewriter">
                Développeur full stack - <span className="text-secondary">Yann Verdier</span>
              </h3>
              <span className="animate-cursor border-r-4 border-secondary h-full"></span>
            </div>
          </div>
          <Image src={'/photo_cv.jpg'} width={400} height={400} alt="profile image" className="rounded-full shadow-md dark:shadow-secondary"/>
        </section>
        <section id="skillsSection"className="flex flex-col w-full md:w-[80%] h-auto justify-around items-center mb-12">
          <h1 className="text-secondary font-semibold text-4xl md:text-6xl mb-12"> Mes Compétences</h1>
          <div className="flex flex-wrap w-[70%] justify-between items-center gap-9">
            {
              skills.map((skill, index) => {
                return (
                  <Skill name={skill} key={index}/>
                );
              })
            }
          </div>
          
        </section>
        <section id="projectsSection" className="flex flex-col w-full md:w-[80%] h-auto justify-around items-center mb-8">
          <h1 className="text-secondary font-semibold text-4xl md:text-6xl mb-12"> Mes Projets</h1>
          <div className="flex flex-col w-[90%] justify-around items-center gap-20">
            {
              projects.map((project, index) => {
                return (
                  <Project name={project.name} description={project.description} link={project.link} key={index}/>
                );
              })
            }
          </div>
        </section>
        <footer>
          <LegalNotices isVisible={legalNotices} hook={handlingModal}/>
          <p className="text-xs">©2024 - création du site: Yann Verdier - <button onClick={() => handlingModal('legalNotices')}><a>mentions légales</a></button></p>
        </footer> 
      </main>  
    </>
    

  );
}
