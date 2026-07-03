import {defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({name: 'degree', title: 'Degree', type: 'string'}),
    defineField({name: 'school', title: 'School', type: 'string'}),
    defineField({name: 'startDate', title: 'Start Date', type: 'string'}),
    defineField({name: 'endDate', title: 'End Date', type: 'string'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'gpa', title: 'GPA', type: 'string'}),
    defineField({name: 'logo', title: 'University Logo', type: 'image'}),
    defineField({
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})