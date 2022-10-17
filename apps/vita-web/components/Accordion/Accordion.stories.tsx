import { ComponentStory, ComponentMeta } from '@storybook/react'
import Accordion, { IAccordion } from './Accordion'
import { mockAccordionProps } from './Accordion.mocks'

export default {
    title: 'templates/Accordion',
    component: Accordion,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof Accordion>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Accordion> = args => (
    <Accordion {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockAccordionProps.base
} as IAccordion
