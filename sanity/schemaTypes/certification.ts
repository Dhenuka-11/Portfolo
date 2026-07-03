import {defineField, defineType} from 'sanity'

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Certification Name', type: 'string'}),
    defineField({name: 'issuer', title: 'Issuer', type: 'string'}),
    defineField({name: 'issuerType', title: 'Issuer Type', type: 'string',
      options: {list: ['Microsoft', 'Databricks', 'Docker', 'HackerRank', 'Other']}}),
    defineField({name: 'earnedDate', title: 'Earned Date', type: 'string'}),
    defineField({name: 'expiryDate', title: 'Expiry Date', type: 'string'}),
    defineField({name: 'credentialUrl', title: 'Credential URL', type: 'url'}),
    defineField({name: 'badgeImage', title: 'Badge/Certificate Image', type: 'image'}),
    defineField({name: 'order', title: 'Order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})