import Head from 'next/head'
import Link from 'next/link'
import styles from './index.module.css'

export default function Home() {
  // from-gray-800 to-black bg-gradient-to-br
  return (
    <div className={styles.animated_wrapper}>
      <Head>
        <title className=''>Jonathan Curtis</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col py-24 p-2 items-center'>
        <section className='text-center'>
          <h1 className='text-2xl font-bold'>Jonathan Curtis</h1>
          <h2 className='mt-2'>Computer Programmer</h2>
        </section>
        <section className='pt-32 grid grid-rows-auto md:grid-cols-auto text-base max-w-xl'>
          <p className='text-slate-400 font-serif italic font-medium'>About</p>
          <div className='md:text-base text-sm'>
            <p>My name is Jonathan Curtis. I am a computer programmer currently living in the boring state of Ohio.</p>
            <br></br>
            <p>I&apos;m currently working on getting my Computer Science degree from Mount Vernon Nazarene University.</p>
            <br></br>
            <p>I have a wide range of skills. Languages I&apos;ve used include C#, Java, JavaScript, Python, and many more.</p>
            <br></br>
            <p className='testing'>Furthermore, I have experience with SQL databases, as well as many web frameworks & libraries, like Next.js, React, Svelte, and more.</p>
          </div>
        </section>
        <section className='pt-12 grid grid-rows-auto md:grid-cols-auto text-base max-w-xl'>
          <p className='text-slate-400 font-serif italic font-light'>Projects</p>
          <div className='md:text-base text-sm'>
            <p><a href='https://github.com/jcurtis06/Jadot' target={"_blank"} rel={"noreferrer"}>Java Calculator</a></p>
            <p >A semi-advanced calculator capable of solving problems with parenthesis.</p>
            <br></br>
            <p><a href='https://jcurtis06.github.io/minesweeper/' target={"_blank"} rel={"noreferrer"}>Minesweeper</a></p>
            <p>A complete game of Minesweeper, written in pure HTML, CSS, and JS.</p>
            <br></br>
            <p><a href='https://github.com/jcurtis06/Jadot' target={"_blank"} rel={"noreferrer"}>Jadot</a></p>
            <p>A simple game engine written in Java featuring a node-based system similar to <a target={"_blank"} rel={"noreferrer"} href='https://www.godotengine.org'>Godot&apos;s</a>. The game engine also has support for animations, collisions, input, and more.</p>
            <br></br>
            <p><a href='https://tetrjs.netlify.app/' target={"_blank"} rel={"noreferrer"}>Tetrjs</a></p>
            <p>Tetrjs is a complete Tetris game made in HTML, CSS, and JS. I also made a version in React.</p>
            <br></br>
            <p><a href='https://tetrjs.netlify.app/' target={"_blank"} rel={"noreferrer"}>This Website</a></p>
            <p>Created in Next.js with TailwindCSS</p>
          </div>
        </section>
      </main>
      <footer>
        <div className='flex flex-row items-center justify-center pb-12'>
          <a className='mr-5' href='https://www.github.com/jcurtis06' target={"_blank"} rel={"noreferrer"}>GitHub</a>
          <Link href={"/tutorials"}>
            <a className='mr-5'>Tutorials</a>
          </Link>
          <a className='mr-5' href='github.com/jcurtis06' target={"_blank"} rel={"noreferrer"}>Contact</a>
        </div>
      </footer>
    </div>
  )
}
