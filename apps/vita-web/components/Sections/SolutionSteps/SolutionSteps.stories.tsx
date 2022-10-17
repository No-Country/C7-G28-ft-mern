import { ComponentStory, ComponentMeta } from '@storybook/react'
import SolutionSteps, { ISolutionSteps } from './SolutionSteps'
import { mockSolutionStepsProps } from './SolutionSteps.mocks'

export default {
    title: 'Sections/SolutionSteps',
    component: SolutionSteps,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof SolutionSteps>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SolutionSteps> = args => (
    <SolutionSteps {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockSolutionStepsProps.base
} as ISolutionSteps
