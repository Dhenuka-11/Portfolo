import {client, queries} from '../lib/sanity'
import Portfolio from './components/Portfolio'

export const revalidate = 60

export default async function Home() {
  const [about, experience, projects, certifications, education, photos] = await Promise.all([
    client.fetch(queries.about),
    client.fetch(queries.experience),
    client.fetch(queries.projects),
    client.fetch(queries.certifications),
    client.fetch(queries.education),
    client.fetch(queries.photos),
  ])
  return (
    <Portfolio
      about={about}
      experience={experience}
      projects={projects}
      certifications={certifications}
      education={education}
      photos={photos}
    />
  )
}
