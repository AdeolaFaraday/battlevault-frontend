import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Input from '@/src/components/common/input'
import { FieldError } from 'react-hook-form'

describe('Input', () => {
    it('it renders input correctly', () => {
        render(<Input label='First name' />)

        const label = screen.getByRole('textbox')

        expect(label).toBeInTheDocument()
    })

    it('it does not show error on load', () => {
        render(<Input label='First name' />)

        const label = screen.queryByTestId('input_error')

        expect(label).toBeNull()
    })

    it('it shows error when error object is defined', () => {
        render(<Input label='First name' error={{ message: "first name required" } as FieldError} />)

        const label = screen.queryByTestId('input_error')

        expect(label).toBeInTheDocument()
    })
})