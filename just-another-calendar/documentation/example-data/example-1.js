// Copy and paste this code into the browser console
init(JSON.stringify({
    date: '2024-11-19',
    view: 'resourceTimeGridDay',
    days: 1,

    calendarStartTime: '06:00',
    calendarEndTime: '19:00',
    initialScrollTime: '08:00',
    
    locale: 'en-uk',
    firstDayOfWeek: 'mon',

    // Resource list
    resources: [
        { id: 'room1', title: 'Room 1' },
        { id: 'room2', title: 'Room 2' },
        { id: 'room3', title: 'Room 3' },
        { id: 'room6', title: 'Room 6' },
        { id: 'other', title: 'Other' }
    ],

    // Event List
    events: [
        {
            id: '001',
            resourceId: 'room1',

            dateStart: '2024-11-19',
            dateEnd: '2024-11-19',
            timeStart: '09:00',
            timeEnd: '10:00',

            // Custom values
            Title: 'Example Event',
            Speaker: 'Speaker Lastname',
            EventType: 'technical'
        },

        {
            id: '002',
            resourceId: 'room6',

            dateStart: '2024-11-19',
            dateEnd: '2024-11-19',
            timeStart: '09:00',
            timeEnd: '10:00',

            // Custom values
            Title: 'Just another Calendar',
            Speaker: 'Andreas Haandlykken',
            EventType: 'sponsor'
        },

        {
            id: '003',
            resourceId: 'other',

            dateStart: '2024-11-19',
            dateEnd: '2024-11-19',
            timeStart: '10:00',
            timeEnd: '10:30',

            Title: 'Break',
            EventType: 'break',

            colors: {
                background: '#a35c36'
            }
        }
    ],

    // SVG Icons
    icons: [
        {
            name: 'database',
            html: '<svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img"><path fill="currentColor" fill-rule="evenodd" d="M4.75 8c0-.235.106-.518.418-.841.316-.327.808-.655 1.476-.947C7.976 5.63 9.869 5.25 12 5.25s4.024.38 5.356.962c.667.292 1.16.62 1.476.947.312.323.418.606.418.841s-.106.518-.418.841c-.316.327-.809.655-1.476.947-1.332.583-3.225.962-5.356.962s-4.024-.38-5.356-.962c-.668-.292-1.16-.62-1.476-.947-.312-.323-.418-.606-.418-.841M12 3.75c-2.288 0-4.394.404-5.957 1.088-.78.341-1.46.767-1.954 1.278C3.592 6.631 3.25 7.27 3.25 8s.342 1.369.84 1.884c.493.51 1.172.937 1.953 1.278 1.563.684 3.67 1.088 5.957 1.088s4.394-.404 5.958-1.088c.78-.341 1.459-.767 1.953-1.278.497-.515.839-1.153.839-1.884s-.342-1.369-.84-1.884c-.494-.51-1.172-.937-1.953-1.278C16.395 4.154 14.288 3.75 12 3.75m-7.944 7.392a.75.75 0 0 1 .696.801L4.75 12c0 .235.106.518.418.841.316.327.808.655 1.476.947 1.332.583 3.225.962 5.356.962s4.024-.38 5.356-.962c.667-.292 1.16-.62 1.476-.947.312-.323.418-.606.418-.841q0-.029-.002-.057a.75.75 0 0 1 1.496-.105q.006.081.006.162c0 .731-.342 1.37-.84 1.884-.494.51-1.172.937-1.953 1.278-1.563.684-3.67 1.088-5.957 1.088s-4.394-.404-5.957-1.088c-.78-.341-1.46-.767-1.954-1.278-.497-.515-.839-1.153-.839-1.884q0-.081.006-.162a.75.75 0 0 1 .8-.696m0 4a.75.75 0 0 1 .696.801L4.75 16c0 .235.106.518.418.841.316.326.808.655 1.476.947 1.332.583 3.225.962 5.356.962s4.024-.38 5.356-.962c.667-.292 1.16-.62 1.476-.947.312-.323.418-.606.418-.841l-.002-.057a.75.75 0 0 1 1.496-.105q.006.081.006.162c0 .731-.342 1.37-.84 1.884-.494.51-1.172.937-1.953 1.278-1.563.684-3.67 1.088-5.957 1.088s-4.394-.404-5.957-1.088c-.78-.341-1.46-.767-1.954-1.278-.497-.515-.839-1.153-.839-1.884q0-.081.006-.162a.75.75 0 0 1 .8-.695" clip-rule="evenodd"></path></svg>'
        },

        {
            name: 'loudspeaker',
            html: '<svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img"><path fill="currentColor" fill-rule="evenodd" d="M19.03 6.03a.75.75 0 0 0-1.06-1.06l-1.5 1.5a.75.75 0 0 0 1.06 1.06zM19 11.25a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5zm-2.53 5.22a.75.75 0 0 1 1.06 0l1.5 1.5a.75.75 0 1 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1 0-1.06M14.287 5.307A.75.75 0 0 1 14.75 6v12a.75.75 0 0 1-1.28.53l-.615-.614a7.25 7.25 0 0 0-4.1-2.05l-.005-.001V19a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75v-3.325A3.751 3.751 0 0 1 6 8.25h1.567q.38 0 .755-.054l.432-.061a7.25 7.25 0 0 0 4.101-2.051l.615-.614a.75.75 0 0 1 .817-.163m-5.32 9.073-.217-.03v-4.7l.216-.03a8.75 8.75 0 0 0 4.284-1.874v8.508a8.75 8.75 0 0 0-4.284-1.874M6 9.75a2.25 2.25 0 0 0 0 4.5h1.25v-4.5zm1.25 6h-.5v2.5h.5z" clip-rule="evenodd"></path></svg>'
        },

        {
            name: 'mug',
            html: '<svg width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" role="img"><path fill="currentColor" fill-rule="evenodd" d="M5 5.25a.75.75 0 0 0-.75.75v9A4.75 4.75 0 0 0 9 19.75h4A4.75 4.75 0 0 0 17.75 15v-.337q.361.086.75.087a3.25 3.25 0 1 0-.75-6.413V6a.75.75 0 0 0-.75-.75zm4 13A3.25 3.25 0 0 1 5.75 15V6.75h10.5V15A3.25 3.25 0 0 1 13 18.25zm9.5-5c-.269 0-.523-.06-.75-.168V9.918a1.75 1.75 0 1 1 .75 3.332" clip-rule="evenodd"></path></svg>'
        }
    ],

    // Event Component
    defaultEventComponent: 'example',
    eventComponents: [
        {
            name: 'example',
            fields: [
                {
                    value: 'Title',
                    icon: [
                        {
                            icon: 'database',
                            _filter: {
                                EventType: '==technical'
                            }
                        },
                        
                        {
                            icon: 'loudspeaker',
                            _filter: {
                                EventType: '==sponsor'
                            }
                        },

                        {
                            icon: 'mug',
                            _filter: {
                                EventType: '==break'
                            }
                        }
                    ],
                    fullWidth: true
                },

                {
                    template: '- {Speaker}',
                    marginTop: '8px',
                    _filter: {
                        Speaker: '*'
                    }
                }
            ]
        }
    ],

    // Event Filters
    eventFilters: [
        // Event filter using _filter
        {
            title: 'Technical',

            _filter: {
                EventType: '==technical'
            }
        },

        // Event filter using eval
        {
            title: 'Other',
            enabled: true,
            
            eval: "event => ['sponsor', 'break'].includes(event.EventType)"
        }
    ],

    // Insertable events
    eventTemplates: [
        {
            title: 'Break',
            icon: 'mug',

            backgroundColor: '#a35c36',
            textColor: '#ffffff',

            instant: true,
            event: {
                duration: '00:30',
                
                colors: {
                    background: '#a35c36',
                    text: '#ffffff'
                },

                Title: 'Break',
                EventType: 'break'
            }
        },

        {
            title: 'Sponsor',
            icon: 'loudspeaker',

            instant: false,
            event: {
                duration: '01:00',

                Title: 'Sponsor',
                EventType: 'sponsor'
            }
        }
    ],

    // Event creation
    eventCreation: true,
    newEventFields: [
        {
            name: 'Title',
            defaultValue: 'Title',

            /*_filter: {
                EventType: 'sponsor'
            }*/
        },

        {
            name: 'Speaker'
        },

        {
            name: 'colors.background',

            value: [
                {
                    value: "#a35c36",
                    _filter: {
                        eventType: 'break'
                    }
                }
            ]
        },

        {
            name: 'colors.text',

            setter: [
                {
                    value: '#ffffff',
                    _filter: {
                        eventType: 'break'
                    }
                }
            ]
        }
    ]
}));