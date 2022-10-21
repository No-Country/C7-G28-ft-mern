import { ComponentStory, ComponentMeta } from '@storybook/react'
import DashboardLayout, { IDashboardLayout } from './DashboardLayout'
import { mockDashboardLayoutProps } from './DashboardLayout.mocks'

export default {
    title: 'Templates/DashboardLayout',
    component: DashboardLayout,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof DashboardLayout>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DashboardLayout> = args => (
    <DashboardLayout {...args} />
)

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockDashboardLayoutProps.base
} as IDashboardLayout
