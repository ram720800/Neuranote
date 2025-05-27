import NoteForm from "@/components/NoteForm"

const page = () => {
  return (
    <main className="items-center justify-center">
      <article className="w-full">
        <h1 className='text-2xl'>Build your Neuranote</h1>
        <NoteForm/>
      </article>
    </main>
  )
}

export default page