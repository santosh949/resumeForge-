import { z } from 'zod';

export const bioSchema = z.object({
  name: z.string().optional().default(''),
  title: z.string().optional().default(''),
  email: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  location: z.string().optional().default(''),
  linkedin: z.string().optional().default(''),
  github: z.string().optional().default(''),
  website: z.string().optional().default(''),
  summary: z.string().optional().default(''),
});

export const experienceSchema = z.object({
  company: z.string().optional().default(''),
  role: z.string().optional().default(''),
  location: z.string().optional().default(''),
  duration: z.string().optional().default(''),
  highlights: z.array(z.string()).optional().default([]),
  keywords: z.array(z.string()).optional().default([]),
});

export const projectSchema = z.object({
  name: z.string().optional().default(''),
  description: z.string().optional().default(''),
  technologies: z.array(z.string()).optional().default([]),
  highlights: z.array(z.string()).optional().default([]),
  link: z.string().optional().default(''),
});

export const educationSchema = z.object({
  institution: z.string().optional().default(''),
  degree: z.string().optional().default(''),
  year: z.string().optional().default(''),
  gpa: z.string().optional().default(''),
  highlights: z.array(z.string()).optional().default([]),
});

export const skillCategorySchema = z.object({
  category: z.string().optional().default(''),
  items: z.array(z.string()).optional().default([]),
});

export const resumeSchema = z.object({
  bio: bioSchema.optional().default({}),
  experience: z.array(experienceSchema).optional().default([]),
  projects: z.array(projectSchema).optional().default([]),
  education: z.array(educationSchema).optional().default([]),
  skills: z.array(skillCategorySchema).optional().default([]),
});

export type ResumeData = z.infer<typeof resumeSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Bio = z.infer<typeof bioSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
