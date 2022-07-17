import Head from "next/head"

export default function Tutorials() {
    return (
        <div className='bg-gradient-to-br from-gray-800 to-black text-slate-50 min-h-screen'>
            <Head>
                <title>Jonathan Curtis</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500&display=swap" rel="stylesheet" />
            </Head>
            <main className='flex flex-col py-24 p-2 items-center'>
                <section className='text-center'>
                    <h1 className='text-2xl font-bold'>Tutorials</h1>
                    <h2 className='mt-2'>Learn Something New</h2>
                </section>
            </main>
        </div>
    )
}