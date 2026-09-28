import Banner from './_components/Banner';
import AboutMe from './_components/AboutMe';
import Skills from './_components/Skills';
import Experiences from './_components/Experiences';
import ProjectList from './_components/ProjectList';
import Contact from './_components/Contact';
import Marquee from '@/components/Marquee';
import { marqueeWords } from '@/config/site';

const Home = () => (
    <main>
        <Banner />
        <Marquee items={marqueeWords} duration={32} />
        <AboutMe />
        <Skills />
        <Experiences />
        <ProjectList />
        <Contact />
    </main>
);

export default Home;
