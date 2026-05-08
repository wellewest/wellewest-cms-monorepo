import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

/**
 * WelleWest Block-Pool
 * Wird in Pages (und später Posts) eingebunden via `blocks: WelleWestBlocks`.
 * Astro-Templates rendern jeden Block via packages/blocks/BlockRenderer.astro.
 */

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: { de: 'Hero', en: 'Hero' }, plural: { de: 'Heros', en: 'Heros' } },
  imageURL: '/admin/blocks/hero.svg',
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (kleines Label über Titel)' },
    { name: 'title', type: 'text', required: true, label: 'Titel' },
    { name: 'subtitle', type: 'textarea', label: 'Subtitle / Untertitel' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Hintergrundbild' },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', label: 'Button-Text', admin: { width: '50%' } },
        { name: 'ctaLink', type: 'text', label: 'Button-Link', admin: { width: '50%' } },
      ],
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'cover',
      label: 'Variante',
      options: [
        { label: 'Vollbild mit Overlay', value: 'cover' },
        { label: 'Geteilt (Bild rechts)', value: 'split' },
        { label: 'Schlicht (kein Bild)', value: 'plain' },
      ],
    },
  ],
}

export const TextImageBlock: Block = {
  slug: 'textImage',
  labels: { singular: { de: 'Text + Bild', en: 'Text + Image' }, plural: { de: 'Text + Bild', en: 'Text + Image' } },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow' },
    { name: 'heading', type: 'text', required: true, label: 'Überschrift' },
    {
      name: 'body',
      type: 'richText',
      label: 'Fließtext',
      editor: lexicalEditor({}),
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Bild' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      label: 'Bild-Position',
      options: [
        { label: 'Rechts vom Text', value: 'right' },
        { label: 'Links vom Text', value: 'left' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', label: 'Button-Text', admin: { width: '50%' } },
        { name: 'ctaLink', type: 'text', label: 'Button-Link', admin: { width: '50%' } },
      ],
    },
  ],
}

export const TextBlock: Block = {
  slug: 'text',
  labels: { singular: { de: 'Text-Sektion', en: 'Text Section' }, plural: { de: 'Text-Sektionen', en: 'Text Sections' } },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Eyebrow' },
    { name: 'heading', type: 'text', label: 'Überschrift' },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Inhalt',
      editor: lexicalEditor({}),
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'narrow',
      label: 'Breite',
      options: [
        { label: 'Schmal (gut lesbar)', value: 'narrow' },
        { label: 'Normal', value: 'normal' },
        { label: 'Breit', value: 'wide' },
      ],
    },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: { de: 'Galerie', en: 'Gallery' }, plural: { de: 'Galerien', en: 'Galleries' } },
  fields: [
    { name: 'heading', type: 'text', label: 'Überschrift (optional)' },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Bilder',
      labels: { singular: { de: 'Bild', en: 'Image' }, plural: { de: 'Bilder', en: 'Images' } },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', label: 'Bildunterschrift' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      label: 'Spalten',
      options: [
        { label: '2 Spalten', value: '2' },
        { label: '3 Spalten', value: '3' },
        { label: '4 Spalten', value: '4' },
      ],
    },
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: { de: 'FAQ', en: 'FAQ' }, plural: { de: 'FAQs', en: 'FAQs' } },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Häufige Fragen', label: 'Überschrift' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Fragen & Antworten',
      labels: { singular: { de: 'Frage', en: 'Question' }, plural: { de: 'Fragen', en: 'Questions' } },
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Frage' },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Antwort',
          editor: lexicalEditor({}),
        },
      ],
    },
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: { de: 'Call-to-Action', en: 'Call to Action' }, plural: { de: 'Call-to-Actions', en: 'CTAs' } },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Überschrift' },
    { name: 'text', type: 'textarea', label: 'Begleittext' },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', required: true, label: 'Button-Text', admin: { width: '50%' } },
        { name: 'ctaLink', type: 'text', required: true, label: 'Button-Link', admin: { width: '50%' } },
      ],
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'accent',
      label: 'Variante',
      options: [
        { label: 'Akzent (farbiger Hintergrund)', value: 'accent' },
        { label: 'Schlicht', value: 'plain' },
        { label: 'Dunkel', value: 'dark' },
      ],
    },
  ],
}

export const WelleWestBlocks: Block[] = [
  HeroBlock,
  TextImageBlock,
  TextBlock,
  GalleryBlock,
  FAQBlock,
  CTABlock,
]
