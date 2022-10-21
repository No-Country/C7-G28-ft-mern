import { ComponentStory, ComponentMeta } from '@storybook/react'
import Sidebar, { ISidebar } from './Sidebar'
import { mockSidebarProps } from './Sidebar.mocks'

export default {
    title: 'Templates/Sidebar',
    component: Sidebar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof Sidebar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Sidebar> = args => <Sidebar {...args} />

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockSidebarProps.base
} as ISidebar
