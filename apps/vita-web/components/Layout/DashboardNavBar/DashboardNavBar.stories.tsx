import { ComponentStory, ComponentMeta } from '@storybook/react'
import DashboardNavBar, { IDashboardNavBar } from './DashboardNavBar'
import { mockDashboardNavBarProps } from './DashboardNavBar.mocks'

export default {
    title: 'Templates/DashboardNavBar',
    component: DashboardNavBar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof DashboardNavBar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DashboardNavBar> = args => (
    <DashboardNavBar {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockDashboardNavBarProps.base
} as IDashboardNavBar
