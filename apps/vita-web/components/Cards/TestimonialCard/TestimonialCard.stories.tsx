import { ComponentStory, ComponentMeta } from '@storybook/react'
import TestimonialCard, { ITestimonialCard } from './TestimonialCard'
import { mockTestimonialCardProps } from './TestimonialCard.mocks'

export default {
    title: 'Cards/TestimonialCard',
    component: TestimonialCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof TestimonialCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TestimonialCard> = args => (
    <TestimonialCard {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockTestimonialCardProps.base
} as ITestimonialCard
