'use client';

import React from 'react';
import Image from 'next/image';
import styles from './About.module.css';
import fatemehImg from './images/WhatsApp Image 2024-08-12 at 7.17.52 PM.jpeg';
import dhruveImg from './images/dhruve.jpg';

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.heading}>About Us</h1>
      <section className={styles.personSection}>
        <Image
          src={fatemehImg}
          alt="Fatemeh Hatefi"
          className={styles.image}
          width={200}
          height={200}
        />
        <div>
          <h2 className={styles.sectionHeading}>Fatemeh Hatefi</h2>
          <p className={styles.text}>
            Hello! I am Fatemeh Hatefi, a passionate developer and a dedicated student. I have a strong background in web development with skills in JavaScript, React, and Next.js. I enjoy solving complex problems and continuously learning new technologies.
          </p>
          <h3 className={styles.subHeading}>Skills</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>JavaScript, React, Next.js</li>
            <li className={styles.listItem}>HTML, CSS, Responsive Design</li>
            <li className={styles.listItem}>Backend Development (Node.js, Express)</li>
            <li className={styles.listItem}>Database Management (MongoDB)</li>
          </ul>
          <h3 className={styles.subHeading}>Hobbies</h3>
          <p className={styles.text}>
            When I am not coding, I enjoy painting, reading books on technology, and exploring new places. I also love spending time with my family and friends.
          </p>
          <h3 className={styles.subHeading}>Role in Project</h3>
          <p className={styles.text}>
            In this project, I worked on the frontend, including creating the MovieList component, setting up the Redux store, and implementing various features to enhance user experience.
          </p>
        </div>
      </section>

      <section className={styles.personSection}>
        <Image
          src={dhruveImg}
          alt="Dhruve Sahni"
          className={styles.image}
          width={200}
          height={200}
        />
        <div>
          <h2 className={styles.sectionHeading}>Dhruve Sahni</h2>
          <p className={styles.text}>
            Hi! I am Dhruve Sahni, a tech enthusiast with a love for problem-solving and a keen interest in backend development. I have experience working with various technologies and enjoy building efficient and scalable applications.
          </p>
          <h3 className={styles.subHeading}>Skills</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>JavaScript, React, Redux</li>
            <li className={styles.listItem}>Backend Development (Node.js, Express)</li>
            <li className={styles.listItem}>Database Design and Management (MySQL, MongoDB)</li>
            <li className={styles.listItem}>Version Control (Git)</li>
          </ul>
          <h3 className={styles.subHeading}>Hobbies</h3>
          <p className={styles.text}>
            I love playing chess, exploring new programming languages, and working on personal projects. I also enjoy reading science fiction novels and staying updated with the latest tech trends.
          </p>
          <h3 className={styles.subHeading}>Role in Project</h3>
          <p className={styles.text}>
            In this project, I focused on backend development, including setting up the server, handling API requests, and integrating with the database to support the frontend functionality.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
