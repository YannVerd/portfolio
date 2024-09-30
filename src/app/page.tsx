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
  // skills's names match pictures's names
   const skills = ['React','Expo', 'Nodejs', 'Mongoose', 'MongoDB', 'Flutter', 'MySQL', 'JavaScript', 'cpp'];
   const projects = [
    {
      name: 'WitcherJDR', 
      description: `Projet pour une feuille de Personnage automatique pour le jeu de role The witcher.
                    Framework non possible car doit être utilisé hors ligne sur public non averti (Pas de commandes ou manipulation complexe).
                    Server et base de donnée en serveur privé (physique local) uniquement pour sauvegarder les personnages.
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
        <section id="presentationSection" className="flex w-full lg:w-[86%] flex-col lg:flex-row justify-between items-center mb-12">
          <div className="flex flex-col flex-wrap md:flex-nowrap justify-center items-center">
            <h1 className="text-secondary text-center font-bold text-4xl md:text-6xl  dark:text-white">Bienvenue sur mon Portfolio</h1>
            <div className="flex items-center w-full space-x-2" >
              <h3 className="text-xl text-center font-mono overflow-hidden whitespace-wrap md:whitespace-nowrap md:animate-typewriter">
                Développeur full stack - <span className="text-secondary">Yann Verdier</span>
              </h3>
              <span className="hidden md:block md:animate-cursor border-r-4 border-secondary h-8"></span>
            </div>
          </div>
          <Image src={'/photo_cv.jpg'} width={400} height={400} priority alt="profile image" className="rounded-full w-52 md:w-72 lg:w-96 shadow-md dark:shadow-secondary"/>
        </section>
        <section id="skillsSection" className="flex flex-col w-full md:w-[80%] h-auto justify-around items-center mb-12">
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
