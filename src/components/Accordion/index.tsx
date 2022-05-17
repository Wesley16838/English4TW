import React, { useState } from 'react';
import { StyleSheet, View, Text,} from 'react-native';
import { IAccordion } from '../../types/components/accordion';
import { DEVICE_WIDTH } from "../../pages/splashpage";
import { Colors, Spacing, Typography } from '../../styles';

const Accordion: React.FC<IAccordion> = ({ title, content, isActiveDefault=false, onOpen }) => {
    const [isActive, setIsActive] = useState(isActiveDefault)
    return(
        <View style={styles.accordion}>
            <View
                style={styles.accordion_title_container}
                onTouchEnd = {() => {
                    onOpen()
                    setIsActive(!isActive)
                }}
            >
                <Text style={styles.accordion_title}>{title}</Text>
                {/* <Text>{isActive ? '-' : '+'}</Text> */}
            </View>
            {isActive && <View style={styles.accordion_content}>{content}</View>}
        </View>
    )
}
const styles = StyleSheet.create({
    accordion: {
        flexDirection: 'column',
        marginBottom: Spacing.space_xl,
    },
    accordion_title_container: {
        width: DEVICE_WIDTH - 40,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 25,
        backgroundColor: Colors.button_primary_press,
    },
    accordion_title: {
        ...Typography.base_bold,
        color: Colors.white,
    },
    accordion_content: {
        borderColor: Colors.primary,
        borderWidth: .5,
        borderRadius: 20,
        padding: 15,
        width: DEVICE_WIDTH - 40,
        marginTop: 10,
    }
})

export default Accordion;