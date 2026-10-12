import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('renders the church landing page content', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { name: /welcome to living dove chapel/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/impacting lives through christ-centered worship/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /there is a place for you here/i })).toBeInTheDocument();
  expect(screen.getAllByText('8:00 AM–11:30 AM')).toHaveLength(2);
  expect(screen.getByRole('link', { name: /watch the service/i })).toHaveAttribute(
    'href',
    'https://www.facebook.com/100069340956142/videos/living-dove-chapel/1543925197231340/'
  );
});

test('mobile navigation can be opened and closed', () => {
  render(<App />);

  const menuButton = screen.getByRole('button', { name: /open navigation menu/i });
  fireEvent.click(menuButton);
  expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  const navigation = within(screen.getByRole('navigation', { name: 'Main navigation' }));
  expect(navigation.getByRole('link', { name: 'Departments' })).toHaveAttribute('href', '#departments');
  fireEvent.click(screen.getByRole('link', { name: 'Gatherings' }));
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
});

test('gallery photos open in a lightbox and close with Escape', () => {
  render(<App />);

  expect(screen.getAllByRole('button', { name: /^view photo:/i })).toHaveLength(9);
  expect(screen.queryByRole('button', { name: /load more photos/i })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'View photo: Worship together' }));
  expect(screen.getByRole('dialog', { name: 'Worship together' })).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'View photo: Worship together' })).toHaveFocus();
});

test('shows church leaders, branches, and an embedded map with directions', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Prophet Job Aidoo' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Jesus Temple' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Rehoboth Temple' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Praise Temple' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Morning Star Temple' })).toBeInTheDocument();
  expect(
    screen.getByTitle('Map showing Jesus Temple, Community 2, Tema').getAttribute('src')
  ).toContain('output=embed');
  expect(screen.getAllByRole('link', { name: /^get directions$/i })).toHaveLength(4);
});

test('renders the named pastors in the requested order and eight profiles for every department', () => {
  render(<App />);

  const pastorNames = [
    'Prophet Job Aidoo',
    'Apostle Jeffery Yankey',
    'Pastor Wilfred Nii Armah',
    'Pastor Nii Odai Mensah',
    'Pastor George Turkson',
    'Pastor Annorhomah Quarm',
    'Elder Maccandles Mark',
    'Pastor Maxwell Kwofi Ampiah',
    'Lady Pastor Serwaa Aidoo',
    'Lady Pastor Patience Nii Armah',
    'Lady Pastor Dorcas',
  ];
  const pastorSection = document.getElementById('leaders');
  const renderedPastorNames = Array.from(pastorSection.querySelectorAll('.profile-card-copy h3'))
    .map((heading) => heading.textContent);

  expect(renderedPastorNames).toEqual(pastorNames);
  expect(pastorSection.querySelectorAll('.profile-card')).toHaveLength(11);

  [
    'Choir',
    'Media Team',
    'Ushers',
    'Instrumentalists',
    'Program Organizers',
    'Polished Corner Stones',
  ].forEach((department) => {
    const departmentHeading = screen
      .getAllByRole('heading', { name: department })
      .find((heading) => heading.closest('.department-group'));
    const section = departmentHeading.closest('.department-group');

    expect(section).toBeInTheDocument();
    expect(section.querySelectorAll('.profile-card')).toHaveLength(8);
    expect(section.querySelectorAll('.profile-photo-placeholder')).toHaveLength(8);
  });
});
