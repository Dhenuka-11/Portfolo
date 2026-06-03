import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: 'p2hk4034',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export const queries = {
  about: `*[_type == "about"][0]{..., photo{asset->}}`,
  experience: `*[_type == "experience"] | order(order asc)`,
  projects: `*[_type == "project"] | order(order asc)`,
  certifications: `*[_type == "certification"] | order(order asc){..., badgeImage{asset->}}`,
  education: `*[_type == "education"] | order(order asc){..., logo{asset->}}`,
}
