import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Full Name', type: 'string'}),
    defineField({name: 'role', title: 'Primary Role', type: 'string'}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'bio', title: 'Bio', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'gpa', title: 'GPA', type: 'string'}),
    defineField({name: 'university', title: 'University', type: 'string'}),
    defineField({name: 'graduationYear', title: 'Graduation Year', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'gmail', title: 'Gmail', type: 'string'}),
    defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'github', title: 'GitHub URL', type: 'url'}),
    defineField({name: 'availableFrom', title: 'Available From', type: 'string'}),
  ],
})
