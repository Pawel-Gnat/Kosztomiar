import { render, screen } from '@testing-library/react';
import { ProjectList } from '@/components/pages/kreatorpage/ProjectList/ProjectList';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    query: { projektid: '3' },
  }),
}));

describe('ProjectList component', () => {
  it('Should render a list of projects with active links properly', () => {
    const projects = [
      { id: 1, name: 'Project1' },
      { id: 2, name: 'Project2' },
      { id: 3, name: 'Project3' },
    ];

    render(<ProjectList projects={projects} />);

    projects.forEach((project) => {
      const projectElement = screen.getByText(project.name);
      expect(projectElement).toBeInTheDocument();
    });
  });
});
