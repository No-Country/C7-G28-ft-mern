import { ComponentStory, ComponentMeta } from '@storybook/react'
import Testimonials, { ITestimonials } from './Testimonials'
import { mockTestimonialsProps } from './Testimonials.mocks'

export default {
    title: 'Sections/Testimonials',
    component: Testimonials,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof Testimonials>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Testimonials> = args => (
    <Testimonials {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockTestimonialsProps.base
} as ITestimonials
