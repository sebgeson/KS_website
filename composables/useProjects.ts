export const useProjects = () =>
  useFetch('/api/projects', {
    key: 'projects',
  })

export const useProject = (slug: string) =>
  useFetch(`/api/projects/${slug}`, {
    key: `project-${slug}`,
  })
