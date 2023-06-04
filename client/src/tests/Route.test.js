import renderWithRouter from "./helpers/renderWithRouter";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'

describe('Тестирование навигации', () => {

  test('Главная страница -> поиск документов', () => {
    render(renderWithRouter(null))
    const button = screen.getByTestId('search-button')
    fireEvent.click(button)
    const findText = screen.getByText('Поиск по запросу:')
    expect(findText).toBeInTheDocument()
  })

  test('Кнопка регистрация', () => {
    render(renderWithRouter(null))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const regButton = screen.getByTestId('registration')
    fireEvent.click(regButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('registerPage')).toBeInTheDocument()
  })

  test('Кнопка авторизация', () => {
    render(renderWithRouter(null))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const regButton = screen.getByTestId('auth')
    fireEvent.click(regButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('authPage')).toBeInTheDocument()
  })

  test('Кнопка профиль', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const profileButton = screen.getByTestId('profileButton')
    fireEvent.click(profileButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('profile')).toBeInTheDocument()
  })


  test('Меню -> Главная', () => {
    render(renderWithRouter(null))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const mainButton = screen.getByTestId('menu-main')
    fireEvent.click(mainButton)
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
  })

  test('Меню -> Регистрация', () => {
    render(renderWithRouter(null))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const mainButton = screen.getByTestId('menu-register')
    fireEvent.click(mainButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('registerPage')).toBeInTheDocument()
  })

  test('Меню -> Авторизация', () => {
    render(renderWithRouter(null))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const mainButton = screen.getByTestId('menu-login')
    fireEvent.click(mainButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('authPage')).toBeInTheDocument()
  })

  test('Меню -> История', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const button = screen.getByTestId('menu-history')
    fireEvent.click(button)
    expect(screen.queryByTestId('welcome')).toBeNull()
  })

  test('Меню -> Папки проектов', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const button = screen.getByTestId('menu-folders')
    fireEvent.click(button)
    expect(screen.queryByTestId('welcome')).toBeNull()
  })

  test('Меню -> Избранное', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const button = screen.getByTestId('menu-favorite')
    fireEvent.click(button)
    expect(screen.queryByTestId('welcome')).toBeNull()
  })

  test('Меню -> Закладки', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const button = screen.getByTestId('menu-bookmarks')
    fireEvent.click(button)
    expect(screen.queryByTestId('welcome')).toBeNull()
  })

  test('404', () => {
    render(renderWithRouter(null))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('menu-about'))
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('notFound')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('menu-filters'))
    expect(screen.getByTestId('notFound')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('menu-calc'))
  })

  test('Профиль -> История', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const profileButton = screen.getByTestId('profileButton')
    fireEvent.click(profileButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('profile')).toBeInTheDocument()
    const historyButton = screen.getByText('История')
    fireEvent.click(historyButton)
    expect(screen.getAllByText('История поиска')[1]).toBeInTheDocument()
  })

  test('Профиль -> Избранное', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const profileButton = screen.getByTestId('profileButton')
    fireEvent.click(profileButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('profile')).toBeInTheDocument()
    const button = screen.getAllByText('Избранное')[1]
    fireEvent.click(button)
    expect(screen.getByText('Очистить')).toBeInTheDocument()
  })

  test('Профиль -> Закладки', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const profileButton = screen.getByTestId('profileButton')
    fireEvent.click(profileButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('profile')).toBeInTheDocument()
    const historyButton = screen.getAllByText('Закладки')[1]
    fireEvent.click(historyButton)
    expect(screen.getByText('Очистить')).toBeInTheDocument()
  })

  test('Профиль -> Папки', () => {
    render(renderWithRouter(null, '/', {
      auth: {isAuth: true}
    }))
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    const profileButton = screen.getByTestId('profileButton')
    fireEvent.click(profileButton)
    expect(screen.queryByTestId('welcome')).toBeNull()
    expect(screen.getByTestId('profile')).toBeInTheDocument()
    const historyButton = screen.getByText('Проекты')
    fireEvent.click(historyButton)

  })



})