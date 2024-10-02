'use client';
import {useState} from "react";
import Header from "@/app/components/header";
import Skill from "./components/skill";
import ProjectCard from "./components/projectCard";
import LegalNotices from "./components/legalNotices";
import Image from "next/image";
import CVModal from "./components/cvModal";
import {skills, projects} from './utils/constants.'
import GameWindow from "@/game/gameWindow";

export default function Home() {
  const [legalNotices, setLegalNotices] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [launchGame, setLaunchGame]= useState(false);

  const handlingModal = (type: string) => {
    switch(type){
      case 'CV':
        setShowCV(!showCV);
        showCV ? document.documentElement.style.overflow = "" : document.documentElement.style.overflow = "hidden"; // fix the background
        break;
      case 'legalNotices':
        setLegalNotices(!legalNotices);
        legalNotices ? document.documentElement.style.overflow = "" : document.documentElement.style.overflow = "hidden";
        break;
      case 'game':
        setLaunchGame(!launchGame);
        launchGame ? document.documentElement.style.overflow = "" : document.documentElement.style.overflow = "hidden";
        break;
    }
  }
 

  return (
    <>
      <Header hook={handlingModal}/>
      <main className="md:w-[95%] w-full flex flex-col justify-between items-center mt-24 mb-20">
        <CVModal isVisible={showCV} hook={(handlingModal)}/>
        <section id="presentationSection" className="flex w-full lg:w-[86%] flex-col lg:flex-row justify-between items-center mb-12">
          <div className="flex flex-col flex-wrap md:flex-nowrap justify-center items-center lg:items-start">
            <h1 className="text-secondary text-center lg:text-start font-bold text-4xl md:text-6xl  dark:text-white">Bienvenue sur mon Portfolio</h1>
            <div className="flex justify-center lg:justify-start items-center w-full space-x-2" >
              <h3 className="text-xl text-center font-mono overflow-hidden whitespace-wrap  md:whitespace-nowrap md:animate-typewriter">
                Développeur full stack - <span className="text-secondary">Yann Verdier</span>
              </h3>
              <span className="hidden md:block md:animate-cursor border-r-4 border-secondary h-8"></span>
            </div>
            <p className="w-8/12 lg:self-start mt-4 mb-4 lg:mb-0">Titulaire du titre de développeur web depuis le 1er Juillet 2024, je suis à la recherche d'une première expérience professionnelle pour me spécialiser et 
              parfaire mes connaissances. D'un naturel sociable, dynamique et curieux, je suis passionné par ce nouveau monde qui s'ouvre à moi.
              Depuis l'obtention de mon diplôme, je n'ai de cesse de pratiquer pour progresser en effectuant des projets personnels que ce soit en Nextjs, c++ ou html/css/js.
              N'hésitez pas à me contacter via les mentions légales ou mon CV.
            </p>
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
                  <ProjectCard name={project.name} description={project.description} link={project.link} key={index}/>
                );
              })
            }
          </div>
        </section>
        <a href="#presentationSection"><Image src="/arrowup.png" alt="Arrow Up" width={34} height={24} className="hover:animate-bounce"/></a>
      </main>  
      <footer>
        <LegalNotices isVisible={legalNotices} hook={handlingModal}/>
        <p className="text-xs">©2024 - création du site: Yann Verdier - <button onClick={() => handlingModal('legalNotices')}><a>mentions légales</a></button></p>
      </footer> 
    </>
  );
}
