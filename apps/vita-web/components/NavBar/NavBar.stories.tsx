import { ComponentStory, ComponentMeta } from '@storybook/react'
import NavBar, { INavBar } from './NavBar'
import { mockNavBarProps } from './NavBar.mocks'

export default {
    title: 'NavBar/NavBar',
    component: NavBar,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {}
} as ComponentMeta<typeof NavBar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavBar> = args => <NavBar {...args} />

export const Base = Template.bind({})

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
    ...mockNavBarProps.base
} as INavBar
