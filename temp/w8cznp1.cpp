#include <iostream>
using namespace std;

// Linked list node structure
struct Node {
    int data;
    Node* next;
};

// Function to add a new node at the beginning of the linked list
void push(Node** head_ref, int new_data) {
    Node* new_node = new Node();
    new_node->data = new_data;
    new_node->next = (*head_ref);
    (*head_ref) = new_node;
}

// Function to segregate 0s, 1s, and 2s in a linked list
void segregate(Node** head_ref) {
    if (*head_ref == nullptr || (*head_ref)->next == nullptr)
        return;

    Node* zero_head = nullptr;
    Node* one_head = nullptr;
    Node* two_head = nullptr;

    Node* curr = *head_ref;

    while (curr != nullptr) {
        if (curr->data == 0) {
            push(&zero_head, 0);
        } else if (curr->data == 1) {
            push(&one_head, 1);
        } else {
            push(&two_head, 2);
        }
        curr = curr->next;
    }

    Node* temp = zero_head;
    while (temp->next != nullptr)
        temp = temp->next;

    temp->next = one_head;
    while (one_head->next != nullptr)
        one_head = one_head->next;

    one_head->next = two_head;

    *head_ref = zero_head;
}

// Function to print the linked list
void printList(Node* node) {
    while (node != nullptr) {
        cout << node->data << " ";
        node = node->next;
    }
}

int main() {
    Node* head = nullptr;
    int n;
    
    cin >> n;
    
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        push(&head, val);
    }

    segregate(&head);

    //cout << "Segregated Linked List: ";
    printList(head);

    return 0;
}