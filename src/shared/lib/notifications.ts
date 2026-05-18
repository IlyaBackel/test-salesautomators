import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.warn('Notification permission denied');
    return false;
  }
  return true;
}

export async function scheduleTodoNotification(todo: {
  id: string;
  title: string;
  executionDateTime: number;
}): Promise<string | undefined> {
  console.log(todo.executionDateTime, 'time todo')
  const eventDate = new Date(todo.executionDateTime);
  const triggerDate = new Date(eventDate.getTime() - 30 * 60 * 1000);

  if (triggerDate <= new Date()) {
    console.log('Notification time is in the past, not scheduling');
    return undefined;
  }

  try{
    const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
        title: 'Task reminder',
        body: `"${todo.title}" will be due in 30 minutes`,
        data: { todoId: todo.id },
        channelId: 'reminders',
      },
      trigger: {
        type: 'date',
        date: triggerDate,
      },
    });
    console.log(`Notification scheduled for task ${todo.id} with ID ${notificationId}`);
    return notificationId;
  }catch(e){
    console.log(e);
  }
}

export async function cancelNotification(notificationId: string) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}