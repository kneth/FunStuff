#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct _person {
    char *name;
    int age;
} person_t;

typedef struct _link_list_element {
    struct _link_list_element *next;
    person_t *payload;
} link_list_element_t;

link_list_element_t *link_list_element_alloc() {
    link_list_element_t *element;

    element = malloc(sizeof(link_list_element_t));
    if (element == NULL) {
        printf("Cannot allocate link_list_element");
        exit(0);
    }

    element->next = NULL;
    element->payload = NULL;

    return element;
}

void link_list_element_free(link_list_element_t *element) {
    free((void *)element);
}

typedef struct _link_list {
    link_list_element_t *first;
    link_list_element_t *last;
} link_list_t;


link_list_t *link_list_alloc() {
    link_list_t *list = malloc(sizeof(link_list_t));

    if (!list) {
        printf("Cannot allocate list.");
        exit(-1);
    }

    list->first = NULL;
    list->last = NULL;
    return list;
}

void link_list_free(link_list_t *list) {
    link_list_element_t *iter;

    iter = list->first;
    while (iter != NULL) {
        link_list_element_t *next = iter->next;
        link_list_element_free(iter);
        iter = next;
    }

    free((void *)list);
}

void link_list_append(link_list_t *list, person_t *person) {
    link_list_element_t *element;
    link_list_element_t *last;

    element = link_list_element_alloc();
    element->payload = person;
    element->next = NULL;

    if (list->first == NULL) {
        list->first = element;
        list->last = element;
    }

    last = list->last;
    list->last = element;
    last->next = element;
}

size_t link_list_count(link_list_t *list) {
    size_t count = 0;
    link_list_element_t *iter = list->first;
    while (iter != NULL) {
        count++;
        iter = iter->next;
    }
    return count;
}

int main(int argc, char *argv[]) {
    link_list_t *list;
    person_t *bonnie;
    person_t *clyde;


    bonnie = malloc(sizeof(person_t));
    bonnie->name = strdup("Bonnie");
    bonnie->age = 24;

    clyde = malloc(sizeof(person_t));
    clyde->name = strdup("Clyde");
    clyde->age = 23;

    list = link_list_alloc();
    link_list_append(list, bonnie);
    link_list_append(list, clyde);

    printf("%zu", link_list_count(list));

    link_list_free(list);
    free((void *)clyde);
    free((void *)bonnie);
}