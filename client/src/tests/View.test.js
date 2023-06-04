import {fireEvent, render, screen} from "@testing-library/react";
import renderWithRouter from "./helpers/renderWithRouter";



describe('Отображение страниц', () => {

  test('Поиск документов (документы найдены успешно)', () => {
    render(renderWithRouter(null))
    const button = screen.getByTestId('search-button')
    fireEvent.click(button)
    const findText = screen.getByText('Поиск по запросу:')
    expect(findText).toBeInTheDocument()
  })

})