import { ComponentStory, ComponentMeta } from '@storybook/react'
import TeamExperience, { ITeamExperience } from './TeamExperience'
import { mockTeamExperienceProps } from './TeamExperience.mocks'

export default {
    title: 'Sections/TeamExperience',
    component: TeamExperience,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof TeamExperience>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TeamExperience> = args => (
    <TeamExperience {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockTeamExperienceProps.base
} as ITeamExperience
