import { ComponentStory, ComponentMeta } from '@storybook/react'
import Specialties, { ISpecialties } from './Specialties'
import { mockSpecialtiesProps } from './Specialties.mocks'

export default {
    title: 'Sections/Specialties',
    component: Specialties,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof Specialties>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Specialties> = args => (
    <Specialties {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockSpecialtiesProps.base
} as ISpecialties
