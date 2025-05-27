import NoteCard from "@/components/NoteCard"

const page = () => {
  return (
    <main>
      <h1 className="text-2xl">Popular neuranotes</h1>
      <section className="home-section">
        <NoteCard
          id="123"
          name="Next.js"
          topic="SEO and SSR in Nex.js"
          subject="coding"
          duration={15}
          color="bg-gradient-to-b from-white to-[#8CC385]"
          badge="#8CC385"
        />
        <NoteCard
          id="124"
          name="Neural Networks"
          topic="Mind behind neural network"
          subject="ML"
          duration={20}
          color="bg-gradient-to-b from-white to-[#C3A885]"
          badge="#C3A885"
        />
        <NoteCard
          id="124"
          name="web 3"
          topic="How blockchain works"
          subject="Crypto"
          duration={20}
          color="bg-gradient-to-b from-white to-[#B396B5]"
          badge="#B396B5"
        />
      </section>
    </main>
  )
}

export default page