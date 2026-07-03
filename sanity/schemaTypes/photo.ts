import {defineField, defineType} from 'sanity'

export const photo = defineType({
  name: 'photo',
  title: 'Photography',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title (optional)', type: 'string'}),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'caption', title: 'Caption (optional)', type: 'string'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'caption', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title: title || 'Untitled photo', subtitle, media}
    },
  },
})
