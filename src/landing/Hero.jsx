import  { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { Link } from 'react-router-dom';
import image1 from './assets/image1.jpg'; 
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';
import image4 from './assets/image4.jpg';
import image5 from './assets/image5.jpg';

const content = [
    {
        image: image1,
        title: "Secure Your Future with MassMutual",
        description: "We offer financial planning and life insurance to help you protect what matters most."
    },
    {
        image: image2,
        title: "Planning for Tomorrow, Today",
        description: "Build a solid financial foundation with personalized plans that align with your goals."
    },
    {
        image: image3,
        title: "Expert Guidance Every Step of the Way",
        description: "Our team of experts will guide you through your financial journey, ensuring a prosperous future."
    },
    {
        image: image4,
        title: "Financial Solutions Tailored for You",
        description: "No matter your needs, we have plans that provide the protection and flexibility you require."
    },
    {
        image: image5,
        title: "Join Millions Securing Their Future",
        description: "MassMutual is committed to helping individuals and families achieve financial stability and success."
    }
];

const Hero = () => {
    const [currentContent, setCurrentContent] = useState(0);

    // Automatically change content every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentContent((prevContent) => (prevContent + 1) % content.length);
        }, 5000);
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background image carousel */}
            <div className={styles.imageContainer}>
                <img src={content[currentContent].image} alt="Hero background" className={styles.image} />
            </div>
            
            {/* Hero content */}
            <div className={styles.heroContent}> {}
                <h2>{content[currentContent].title}</h2>
                <h1>Plan today. Prosper tomorrow.</h1>
                <p>{content[currentContent].description}</p>
                <Link to="/Login"> 
                    <button className={styles.ctaButton}>Get Started ➔</button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
